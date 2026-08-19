FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "--watch", "app.js"]
