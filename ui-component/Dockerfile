FROM node:current-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY ./src ./src
COPY ./svelte.config.js ./svelte.config.js
COPY ./tsconfig.json ./tsconfig.json  
COPY ./vite.config.ts ./vite.config.ts

RUN yarn build

ARG PORT

ENV PORT=$PORT

CMD HOST=0.0.0.0 PORT=$PORT node build

