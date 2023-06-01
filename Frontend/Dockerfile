FROM node:18.14-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH


COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

RUN npm ci 
RUN apk update && apk add bash


COPY . .

EXPOSE 3000

