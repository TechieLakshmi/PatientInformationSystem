FROM node
WORKDIR /Authetication
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 3001