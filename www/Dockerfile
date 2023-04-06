FROM node:18-slim

WORKDIR /user/src/app

COPY ./package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]

