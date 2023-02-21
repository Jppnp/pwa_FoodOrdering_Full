FROM node:18.14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

RUN npm ci 
RUN npm install -g serve
RUN apk update && apk add bash


COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]

