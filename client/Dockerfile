FROM node:12.13.0-alpine as base

WORKDIR /app/client

COPY package*.json /app/client/

RUN npm i 

COPY . /app/client/

EXPOSE 3000

CMD ["npm", "run", "start"]
