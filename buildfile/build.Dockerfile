FROM harbor.emhes.cn:1080/emhes/nginx:latest AS final
WORKDIR /app
COPY . /app
RUN cp ./build.conf /etc/nginx/conf.d/build.conf && rm -f ./build.conf