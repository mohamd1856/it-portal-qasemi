# استخدام نسخة nginx خفيفة
FROM nginx:alpine

# نسخ كافة ملفات المشروع إلى المسار الافتراضي لـ nginx
COPY . /usr/share/nginx/html

# فتح المنفذ 80
EXPOSE 80

