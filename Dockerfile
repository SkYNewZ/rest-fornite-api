FROM mhart/alpine-node:9.4.0
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION
ENV NODE_ENV production
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="Fortnite REST API" \
      org.label-schema.description="NodeJS REST FORTNITE API, get users infos and stats" \
      org.label-schema.url="https://api.fortnite.lemairepro.fr" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/SkYNewZ/docker-fortnite-api" \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="1.0"

WORKDIR /app

# install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# add sources
COPY . .

EXPOSE 3000

ENTRYPOINT ["node", "api.js"]
