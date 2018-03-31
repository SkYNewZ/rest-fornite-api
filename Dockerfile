FROM node as BUILDER
ENV NODE_ENV production
WORKDIR /app

# install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install -g typescript && npm install

# add sources
COPY . .
RUN npm run build


FROM node:9-alpine
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION
ENV NODE_ENV production
WORKDIR /app
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="Fortnite REST API" \
      org.label-schema.description="NodeJS REST FORTNITE API, get users infos and stats" \
      org.label-schema.url="https://skynewz-api-fortnite.herokuapp.com" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/SkYNewZ/rest-fornite-api" \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="1.0"

COPY --from=BUILDER /app/dist .
COPY --from=BUILDER /app/node_modules node_modules
COPY --from=BUILDER /app/src/public public
COPY --from=BUILDER /app/package.json .
EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
