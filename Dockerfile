FROM nginx
COPY /client /client
COPY ./default.conf /etc/nginx/conf.d/