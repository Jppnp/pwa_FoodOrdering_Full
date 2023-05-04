FROM node:18.14-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH


COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --omit=dev
RUN npm install --production
RUN npm install react-scripts@5.0.1 -g --silent

RUN npm ci 
RUN npm install -g serve
RUN apk update && apk add bash


COPY . .

EXPOSE 3000

