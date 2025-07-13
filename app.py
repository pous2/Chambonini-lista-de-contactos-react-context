#abrir con: python3 app.py

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

contacts = []
next_id = 1

@app.route('/contacts', methods=['GET'])
def get_contacts():
    return jsonify(contacts), 200

@app.route('/contacts', methods=['POST'])
def add_contact():
    global next_id
    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos faltantes"}), 400
    data["id"] = next_id
    next_id += 1
    contacts.append(data)
    return jsonify(data), 201

@app.route('/contacts/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    global contacts
    contacts = [c for c in contacts if c["id"] != contact_id]
    return jsonify({"msg": "Contacto eliminado"}), 200

@app.route('/contacts/<int:contact_id>', methods=['PUT'])
def update_contact(contact_id):
    data = request.get_json()
    for contact in contacts:
        if contact["id"] == contact_id:
            contact.update(data)
            return jsonify(contact), 200
    return jsonify({"error": "Contacto no encontrado"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)