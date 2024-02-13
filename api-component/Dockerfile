FROM node:20-alpine3.17

RUN apk update && apk add postgresql

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN yarn global add @nestjs/cli
RUN yarn install
RUN nest build

COPY . .

CMD yarn start

EXPOSE 3000

# CMD ["node", "dist/main.js"]
