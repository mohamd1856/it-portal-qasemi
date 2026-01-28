// פונקציה להצגת הודעות
function appendMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    msgDiv.innerText = text;
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // גלילה אוטומטית למטה
}

// פונקציית השאלה המרכזית
async function askBot() {
    const inputField = document.getElementById('user-input');
    const userText = inputField.value.trim();

    if (!userText) return;

    // הצגת הודעת המשתמש
    appendMessage('user', userText);
    inputField.value = "";

    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        let botResponse = "מצטער, אני לא מכיר את הנושא הזה. נסה לשאול על Moodle או WiFi.";

        // חיפוש תשובה חכם
        for (let item of data.knowledge_base) {
            if (item.keywords.some(key => userText.toLowerCase().includes(key.toLowerCase()))) {
                botResponse = item.answer;
                break;
            }
        }

        setTimeout(() => {
            appendMessage('bot', botResponse);
        }, 500);

    } catch (error) {
        console.error("Error loading data:", error);
        appendMessage('bot', "חלה שגיאה בגישה לנתונים. וודא שקובץ data.json קיים.");
    }
}

// --- הפעלת כפתורים ומקלדת ---

// האזנה לכפתור השליחה
document.getElementById('send-btn')?.addEventListener('click', askBot);

// האזנה למקש Enter
document.getElementById('user-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        askBot();
    }
});

// פונקציה לטופס המודל (moodle.html)
function sendTicket() {
    const name = document.getElementById('name')?.value;
    if (!name) {
        alert("אנא מלא שם מלא");
        return;
    }
    alert("הפנייה נשלחה בהצלحة! (סימולציה)");
    window.location.href = "index.html";
}
