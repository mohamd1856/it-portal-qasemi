from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo
import os

app = Flask(__name__, static_folder='.')

# إعدادات الاتصال بقاعدة البيانات MongoDB داخل Docker
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://db:27017/it_portal")
mongo = PyMongo(app)

# 1. مسار الصفحة الرئيسية (Chatbot)
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# 2. مسار صفحة Moodle (التأكد من توجيهها للملف الصحيح moodle.html)
@app.route('/moodle')
def moodle_page():
    return send_from_directory('.', 'moodle.html')

# 3. مسار الملفات الثابتة (CSS, JS, Images)
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

# 4. استقبال وحفظ طلبات الدعم (Tickets) في قاعدة البيانات
@app.route('/send_ticket', methods=['POST'])
def send_ticket():
    try:
        data = request.json
        # التحقق من وجود البيانات الأساسية
        if not data or 'name' not in data or 'email' not in data:
            return jsonify({"status": "error", "message": "Missing fields"}), 400
            
        # إدراج البيانات في مجموعة tickets داخل MongoDB
        mongo.db.tickets.insert_one(data)
        return jsonify({"status": "success", "message": "Ticket saved"}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    # تشغيل السيرفر على جميع الواجهات لمنفذ 5000 داخل الحاوية
    app.run(host='0.0.0.0', port=5000)
