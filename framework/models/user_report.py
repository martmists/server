# Sayonika Internals
from framework.objects import db

from .base import Base


class UserReport(db.Model, Base):
    __tablename__ = "user_reports"

    content = db.Column(db.Unicode(200))
    author_id = db.Column(None, db.ForeignKey("users.id"))
    target_id = db.Column(None, db.ForeignKey("users.id"))
