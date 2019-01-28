# Stdlib
from datetime import datetime

# Sayonika Internals
from framework.objects import db
from .base import Base
from .enums import Category, ModStatus
from .editors_choice import EditorsChoice


class Mod(db.Model, Base):
    __tablename__ = "mods"

    title = db.Column(db.Unicode(64), unique=True)
    icon = db.Column(db.Unicode(), nullable=True)
    tagline = db.Column(db.Unicode(100))
    description = db.Column(db.Unicode(10000))
    website = db.Column(db.Unicode())
    category = db.Column(db.Enum(Category), default=Category.Unassigned)
    nsfw = db.Column(db.Boolean(), default=False)
    released_at = db.Column(db.Date(), nullable=True)
    editors_choice = db.Column(EditorsChoice)
    last_updated = db.Column(db.DateTime(), default=datetime.now, onupdate=datetime.now)
    status = db.Column(db.Enum(ModStatus))
    downloads = db.Column(db.BigInteger(), default=0)
    download_url = db.Column(db.Unicode(), nullable=True)
    verified = db.Column(db.Boolean(), default=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._authors = set()

    @property
    def authors(self):
        return self._authors

    @authors.setter
    def add_author(self, author):
        self._authors.add(author)

    # authors = Set(lambda: User, reverse='mods')
    # favorited_by = Set(lambda: User, reverse='favorites')
    # reviews = Set(lambda: Review, reverse="mod")
    # reports = Set(lambda: Report, reverse="mod")
