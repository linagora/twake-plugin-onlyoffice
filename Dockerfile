FROM node:16

WORKDIR /usr/src/app

COPY server/package*.json ./
RUN npm install

COPY server/ .
RUN npm build

CMD [ "npm", "start" ]
