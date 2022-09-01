FROM --platform=linux/amd64 node:16.13.2

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]