FROM mhart/alpine-node:9.4.0

ARG FORTNITE_API_VERSION=v2.4.0

WORKDIR /app

ADD https://github.com/SkYNewZ/fortnite-api/archive/$FORTNITE_API_VERSION.zip .
RUN npm install

EXPOSE 3000
ENTRYPOINT ["node", "api.js"]
