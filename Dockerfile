FROM node:20-alpine

WORKDIR /

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js"]