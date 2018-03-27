FROM node:9-alpine as BUILDER
ENV NODE_ENV production
WORKDIR /app

# install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install -g typescript && npm install

# add sources
COPY . .
RUN npm build


FROM node:9-alpine
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION
ENV NODE_ENV production
WORKDIR /app
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="Fortnite REST API" \
      org.label-schema.description="NodeJS REST FORTNITE API, get users infos and stats" \
      org.label-schema.url="https://api.fortnite.lemairepro.fr" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/SkYNewZ/docker-fortnite-api" \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="1.0"

COPY --from=BUILDER /app .
EXPOSE 3000

ENTRYPOINT ["node", "index.js"]