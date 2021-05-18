FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY dist/CloudApperClient .
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/config/config.env.var.json > /usr/share/nginx/html/assets/config/config.env.json && exec nginx -g 'daemon off;'"]