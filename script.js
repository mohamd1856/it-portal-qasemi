function sendTicket() {
    // 1. جلب البيانات من الحقول
    const name = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const desc = document.getElementById('desc').value;

    // 2. التحقق من أن الحقول ليست فارغة
    if (!name || !userEmail || !desc) {
        alert("אנא מלא את כל השדות לפני השליחה");
        return;
    }

    // 3. إعداد تفاصيل البريد الإلكتروني
    const adminEmail = "mohamd@hoteliers.co.il";
    const subject = encodeURIComponent(`פנייה חדשה מפורטל ה-IT: ${name}`);
    
    // تنسيق محتوى الرسالة
    const body = encodeURIComponent(
        `פרטי פנייה חדשה:\n` +
        `------------------\n` +
        `שם מלא: ${name}\n` +
        `אימייל לחזרה: ${userEmail}\n` +
        `תיאור התקלה:\n${desc}\n` +
        `------------------\n` +
        `נשלח דרך פורטל ה-IT המכללתי.`
    );

    // 4. تنفيذ أمر الإرسال (فتح برنامج البريد)
    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;

    // 5. رسالة تأكيد للمستخدم
    alert("מעביר אותך לשליחת המייל...");
}
