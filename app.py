from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo
import os

app = Flask(__name__, static_folder='.')

# חיבור למסד הנתונים לפי ההגדרות ב-Docker Compose
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/it_portal")
mongo = PyMongo(app)

# הגשה של דפי ה-HTML
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

# נתיב לשמירת פנייה חדשה
@app.route('/send_ticket', methods=['POST'])
def send_ticket():
    try:
        data = request.json
        if not data.get('name') or not data.get('email'):
            return jsonify({"error": "Missing fields"}), 400
        
        # שמירה ב-MongoDB
        mongo.db.tickets.insert_one({
            "name": data['name'],
            "email": data['email'],
            "description": data['description'],
            "status": "חדש"
        })
        return jsonify({"message": "Ticket saved successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
