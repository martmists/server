# Stdlib
from datetime import datetime

# External Libraries
import jwt

# Sayonika Internals
# from framework.models import framework.models.User
import framework.models


class JWT:
    algorithm = 'HS256'

    def __init__(self, settings: dict):
        # `settings` is the dict of all ENV vars starting with SAYONIKA_
        self.secret = settings["JWT_SECRET"]

    def make_token(self, id: str, password_reset: int):
        payload = {
            "id": id,
            "lr": password_reset,
            "iat": datetime.utcnow()
        }
        token = jwt.encode(payload, self.secret, algorithm=self.algorithm)

        return token

    async def verify_token(self, token: str, return_parsed: bool = False):
        try:
            decoded = jwt.decode(token, self.secret, algorithms=self.algorithm)
        except Exception:
            return False  # Any errors thrown during decoding probably indicate bad token in some way

        if set(decoded.keys()) != set(["id", "lr", "iat"]):
            return False  # Keys should only be the ones we give

        user = await framework.models.User.get(decoded["id"])

        if user is None or decoded["lr"] != user.last_pass_reset or decoded["iat"] < datetime.utcnow():
            return False

        return decoded if return_parsed else True
