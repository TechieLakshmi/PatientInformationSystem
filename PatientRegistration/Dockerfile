FROM node
WORKDIR /PatientRegistration
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]
EXPOSE 6000