FROM node:10-alpine

WORKDIR /app

COPY . .

EXPOSE 3001

RUN npm install

CMD ["node","entry.js"]
