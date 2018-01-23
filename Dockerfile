FROM mhart/alpine-node:9.4.0
WORKDIR /app

# add sources
COPY . .

# install dependencies
RUN npm install

EXPOSE 3000

CMD ["node", "api.js"]
