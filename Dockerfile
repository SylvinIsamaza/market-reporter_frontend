# Use the official Nginx image
FROM nginx:stable

# Set working directory
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
