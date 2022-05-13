FROM node:latest

EXPOSE 3000

ENV REACT_APP_ENV="production"

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]