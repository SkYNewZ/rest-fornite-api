FROM mhart/alpine-node:9.4.0
WORKDIR /app

# get app
RUN apk add --update --no-cache git && \
    git clone --single-branch --depth=1 https://github.com/SkYNewZ/docker-fortnite-api /app && \
    git clone --single-branch --depth=1 https://github.com/qlaffont/fortnite-api /app/fortnite-api

# install dependencies
RUN npm install

EXPOSE 3000

CMD ["node", "api.js"]
