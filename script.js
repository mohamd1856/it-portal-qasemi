// وظيفة فتح الخدمات في صفحة خارجية جديدة
function openService(url) {
    window.open(url, '_blank');
}

// وظيفة إرسال الإيميل لمحمد
function sendEmail() {
    const userType = document.getElementById('user-type').value;
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('user-email').value;
    const desc = document.getElementById('description').value;

    if (!name || !email || !desc) {
        alert("נא למלא את כל השדות המסומנים ב-*");
        return;
    }

    const recipient = "mohamd@hoteliers.co.il"; 
    const subject = `קריאה חדשה: ${userType} - ${name}`;
    const body = `פרטי הפנייה:\n` +
                 `סוג פונה: ${userType}\n` +
                 `שם איש קשר: ${name}\n` +
                 `מייל לחזרה: ${email}\n` +
                 `תיأور التקלה: ${desc}`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// وظيفة الـ Chatbot المدمجة
function askBot() {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    
    if (input.value.trim() !== "") {
        box.innerHTML += `<p><strong>אתה:</strong> ${input.value}</p>`;
        
        setTimeout(() => {
            box.innerHTML += `<p style="color: #6c63ff;"><strong>בוט:</strong> אני בודק את הנושא מול צוות ה-IT, אנא המתן...</p>`;
            box.scrollTop = box.scrollHeight;
        }, 600);

        input.value = "";
        box.scrollTop = box.scrollHeight;
    }
}


