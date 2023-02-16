FROM node:18.14.0

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

RUN npm ci 
RUN npm install -g serve

COPY . .

EXPOSE 3000

CMD [ "npx", "serve", "build" ]