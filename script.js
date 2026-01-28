// --- وظائف الص'ات ---
function appendMessage(sender, text) {
    const box = document.getElementById('chat-box');
    if(!box) return;
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerText = text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

async function askBot() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if(!text) return;

    appendMessage('user', text);
    input.value = "";

    try {
        const res = await fetch('data.json');
        const data = await res.json();
        let reply = "מצטער, אני לא מכיר את הנושא הזה. נסה לשאול על Moodle או WiFi.";
        
        for(let item of data.knowledge_base) {
            if(item.keywords.some(k => text.toLowerCase().includes(k.toLowerCase()))) {
                reply = item.answer;
                break;
            }
        }
        setTimeout(() => appendMessage('bot', reply), 500);
    } catch(e) { appendMessage('bot', "שגיאה בטעינת נתונים."); }
}

// تشغيل عند الضغط على الزر أو مفتاح Enter
document.getElementById('send-btn')?.addEventListener('click', askBot);
document.getElementById('user-input')?.addEventListener('keypress', (e) => { if(e.key === 'Enter') askBot(); });

// --- وظيفة إرسال النموذج لقاعدة البيانات ---
async function sendTicket() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const desc = document.getElementById('desc').value;

    if(!name || !email) return alert("אנא מלא שדות חובה");

    const ticketData = { name, email, description: desc };

    try {
        const res = await fetch('/send_ticket', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ticketData)
        });
        if(res.ok) {
            alert("הפנייה נשמרה בהצלחה במסד הנתונים!");
            window.location.href = "index.html";
        }
    } catch(err) { alert("שגיאה בחיבור לשרת."); }
}

