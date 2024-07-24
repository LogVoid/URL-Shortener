from config import db
import string


POINTER_CHARS = string.ascii_letters + string.digits


class URL(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pointer = db.Column(db.String(10), unique=True, nullable=False)
    link = db.Column(db.String(200), nullable=False)