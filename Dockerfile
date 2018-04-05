FROM mhart/alpine-node:latest

# Took this frmo https://github.com/kost/docker-nmap/blob/master/Dockerfile
RUN apk --update add nmap && rm -f /var/cache/apk/*

RUN mkdir /src
WORKDIR /src
ADD . .
RUN npm install

EXPOSE 8000
RUN chmod +x ./entrypoint.sh
CMD ./entrypoint.sh
