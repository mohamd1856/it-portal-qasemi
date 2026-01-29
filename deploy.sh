# ملف أتمتة التشغيل
docker stop chatbot-container || true
docker rm chatbot-container || true
docker build -t qasemi-chatbot .
docker run -d -p 80:80 --name chatbot-container qasemi-chatbot
