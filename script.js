// פונקציית שליחת פנייה למסד הנתונים
async function sendTicket() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const desc = document.getElementById('desc').value;

    if (!name || !email || !desc) {
        alert("אנא מלא את כל השדות");
        return;
    }

    const ticketData = {
        name: name,
        email: email,
        description: desc
    };

    try {
        const response = await fetch('/send_ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketData)
        });

        if (response.ok) {
            alert("הפנייה נשמרה בהצלחה במסד הנתונים!");
            window.location.href = "index.html";
        } else {
            alert("שגיאה בשמירת הפנייה.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("לא ניתן להתחבר לשרת.");
    }
}

// שאר פונקציות הצ'אט (כמו בגרסה הקודמת)
// ... (להשאיר את ה-askBot וה-appendMessage כפי שהיו)
