# Sayonika Internals
from framework.objects import db

from .base import Base


class EditorsChoice(db.Model, Base):
    __tablename__ = "editors_choice"

    mod_id = db.Column(None, db.ForeignKey("mods.id"))
    featured = db.Column(db.Boolean(), default=False)
    editors_notes = db.Column(db.Unicode(500), nullable=True)  # 500 char limit as defined in spec
    author_id = db.Column(None, db.ForeignKey("users.id"))
    article_url = db.Column(db.Unicode(), nullable=True)
