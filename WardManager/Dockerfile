FROM node
WORKDIR /WardManager
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 3002