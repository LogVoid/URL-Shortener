from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import secrets

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///flockflow.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app)

db = SQLAlchemy(app)

import routes