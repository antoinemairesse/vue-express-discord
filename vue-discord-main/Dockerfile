FROM --platform=linux/amd64 node:16.13.2

WORKDIR /src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]