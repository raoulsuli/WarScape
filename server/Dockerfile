FROM node:latest

EXPOSE 5000

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]