# External Libraries
from quart import abort, jsonify, request

# Sayonika Internals
from framework.models import Mod
from framework.route import route
from framework.route_wrappers import json, requires_admin
from framework.routecog import RouteCog
from framework.sayonika import Sayonika
from framework.utils import paginate


class Admin(RouteCog):
    @staticmethod
    def dict_all(models):
        return [m.to_dict() for m in models]

    @route("/api/v1/mods/verify_queue", methods=["GET"])
    @requires_admin
    @json
    async def get_queue(self):
        page = request.args.get("page")
        limit = request.args.get("limit")
        page = int(page) if page.isdigit() else 0
        limit = int(limit) if limit.isdigit() else 50

        if not 1 <= limit <= 100:
            limit = max(1, min(limit, 100))  # Clamp `limit` to 1 or 100, whichever is appropriate

        page = page - 1 if page > 0 else 0
        mods = await paginate(Mod.query, page, limit).where(~Mod.verified).gino.all()

        return jsonify(self.to_dict(mods))

    @route("/api/v1/<mod_id>/verify", methods=["POST"])
    @requires_admin
    @json
    async def post_verify(self, mod_id: str):
        if not await Mod.exists(mod_id):
            abort(404, "Unknown mod")

        await Mod.update.values(verified=True).where(Mod.id == mod_id).gino.status()

        return jsonify(True)

    @route("/api/v1/<mod_id>/reject", methods=["POST"])
    @requires_admin
    @json
    async def post_reject(self, mod_id: str):
        if not await Mod.exists(mod_id):
            abort(404, "Unknown mod")

        await Mod.delete.where(Mod.id == mod_id).gino.status()

        return jsonify(True)


def setup(core: Sayonika):
    Admin(core).register()
