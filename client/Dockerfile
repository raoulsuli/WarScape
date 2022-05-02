FROM node:latest

EXPOSE 3000
EXPOSE 35729

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]