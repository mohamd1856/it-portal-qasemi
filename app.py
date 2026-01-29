from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo
import os

app = Flask(__name__, static_folder='.')

# הגדרת MongoDB
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://db:27017/it_portal")
mongo = PyMongo(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# פתרון לשגיאת 404: הוספת ניתוב לטופס מודל
@app.route('/moodle')
def moodle_page():
    return send_from_directory('.', 'moodle.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/send_ticket', methods=['POST'])
def send_ticket():
    try:
        data = request.json
        mongo.db.tickets.insert_one(data)
        return jsonify({"status": "success"}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
