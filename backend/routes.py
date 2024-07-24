from config import app, db
from flask import request, jsonify
from models import URL, POINTER_CHARS
import random


@app.route('/create', methods=['POST'])
def create_shortlink():
    data = request.get_json()

    generated_pointer = ''.join(random.choices(POINTER_CHARS, k=10))

    while URL.query.filter_by(pointer=generated_pointer).first():
        generated_pointer = ''.join(random.choices(characters, k=10))
    
    url = URL(pointer=generated_pointer, link=data['link'])
    
    try:
        db.session.add(url)
        db.session.commit()
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"Error": str(e)}), 500
    
    return jsonify(message="Shortlink created successfully", pointer=generated_pointer), 201

@app.route('/get', methods=['POST'])
def get_link_from_pointer():
    data = request.get_json()
    p = data.get("pointer")

    if not p:
        return jsonify(message="Pointer required"), 400

    url_entry = URL.query.filter_by(pointer=p).first()

    if url_entry is None:
        return jsonify(message="Pointer not found"), 404

    return jsonify(link=url_entry.link)