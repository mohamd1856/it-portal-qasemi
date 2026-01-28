// פונקציית שליחת מייל
function sendEmail() {
    const userType = document.getElementById('user-type').value;
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('user-email').value;
    const desc = document.getElementById('description').value;

    if (!name || !email || !desc) {
        alert("נא למלא את כל השדות!");
        return;
    }

    const recipient = "mohamd@hoteliers.co.il"; 
    const subject = `קריאה חדשה: ${userType} - ${name}`;
    const body = `פרטי הפנייה:\n` +
                 `סוג פונה: ${userType}\n` +
                 `שם: ${name}\n` +
                 `מייל לחזרה: ${email}\n` +
                 `תיאור: ${desc}`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// פונקציית צ'אט בוט
function askBot() {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    
    if (input.value.trim() !== "") {
        box.innerHTML += `<p style="margin: 5px 0;"><strong>אתה:</strong> ${input.value}</p>`;
        
        // תשובת בוט אוטומטית
        setTimeout(() => {
            box.innerHTML += `<p style="margin: 5px 0; color: #4CAF50;"><strong>בוט:</strong> אני מעבד את הבקשה שלך, אנא המתן...</p>`;
            box.scrollTop = box.scrollHeight;
        }, 500);

        input.value = "";
        box.scrollTop = box.scrollHeight;
    }
}
