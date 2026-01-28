# استخدام نسخة مستقرة من Nginx
FROM nginx:alpine

# نسخ ملف الواجهة إلى مجلد الويب الافتراضي للسيرفر
COPY index.html /usr/share/nginx/html/index.html

# فتح المنفذ 80
EXPOSE 80
