# استخدام صورة Nginx الجاهزة
FROM nginx:alpine

# نسخ ملف الـ HTML الذي أنشأناه إلى مجلد الويب داخل الحاوية
COPY index.html /usr/share/nginx/html/index.html

# فتح المنفذ 80
EXPOSE 80




