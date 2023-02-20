FROM node:lts

ENV PORT=9000

WORKDIR /usr/src/app

COPY ./dist/ .

RUN npm install

CMD ["node", "./server/bundle.js"]