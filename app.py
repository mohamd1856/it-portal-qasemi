from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# قاعدة بيانات المعلومات المحدثة لكلية القاسمي
QA_SYSTEM = {
    # إضافة الاستجابة المطلوبة
    "ibrahem aqad": "YES",
    
    # قسم المودل (Moodle)
    "مودل": "للدخول إلى منظومة Moodle، استخدم رقم الهوية وكلمة المرور الشخصية. الرابط: https://moodle.qsm.ac.il",
    "moodle": "To access Moodle, use your ID and password at: https://moodle.qsm.ac.il",
    
    # قسم البريد الإلكتروني (Email)
    "إيميل": "حسابك هو (رقم_الهوية@student.qsm.ac.il). يمكنك الدخول عبر تطبيق Outlook.",
    "email": "Your college email is (ID@student.qsm.ac.il). Use Outlook to log in.",
    "דואל": "האימייל שלך הוא (ID@student.qsm.ac.il). ניתן להתחבר דרך אפליקציית Outlook.",
    
    # قسم كلمة المرور والدعم الفني
    "كلمة المرور": "لتغيير كلمة المرور، يرجى التوجه لبوابة الطالب أو مراجعة مركز الحاسوب (الطابق الأول).",
    "סיסמה": "לשינוי סיסמה, יש לפנות לפורטל הסטודנט או למרכז המחשבים בקומה 1.",
    "password": "To reset your password, please visit the Student Portal or the IT center.",
    "دعم": "رقم الدعم الفني لكلية القاسمي: 04-628-6622. متاحون لمساعدتك دائماً!",
    "תמיכה": "מספר התמיכה הטכנית של מכללת אלקאסמי: 04-628-6622.",
    
    # معلومات عامة
    "ساعات": "يعمل مركز الحاسوب والدعم الفني من الأحد إلى الخميس، من الساعة 8:00 صباحاً حتى 4:00 مساءً.",
    "קבלת קהל": "שעות הפעילות של מרכז המחשבים: ראשון עד חמישי, 08:00-16:00."
}

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_data = request.json
        # تحويل الرسالة لنص صغير لتسهيل البحث (Case-insensitive)
        user_message = user_data.get('message', '').lower()
        
        # الرد الافتراضي
        bot_reply = "أهلاً بك في دعم كلية القاسمي. لم أفهم طلبك تماماً، هل تود الاستفسار عن (المودل، الإيميل، أو كلمة المرور)؟"
        
        # البحث الذكي في القاموس
        for key in QA_SYSTEM:
            if key in user_message:
                bot_reply = QA_SYSTEM[key]
                break
        
        return jsonify({"response": bot_reply})
    except Exception as e:
        return jsonify({"response": f"عذراً، حدث خطأ فني بسيط: {str(e)}"})

if __name__ == '__main__':
    # تشغيل الخادم على المنفذ 5000
    app.run(host='0.0.0.0', port=5000)
