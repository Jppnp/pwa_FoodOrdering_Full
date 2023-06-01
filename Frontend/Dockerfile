FROM node:18.16-alpine
ENV PATH /app/node_modules/.bin:$PATH

RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN apk update && apk add bash

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .

EXPOSE 3000

