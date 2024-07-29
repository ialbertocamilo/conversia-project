FROM node:20-alpine
LABEL authors="Alberto Camilo Rodriguez Vizcarra"

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]