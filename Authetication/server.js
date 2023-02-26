const mongoose = require('mongoose');
const express = require('express')
const app = express()
const uri = "mongodb+srv://user_PI:TEST123!@cluster0.slxmias.mongodb.net/PIS";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log("Successfully connected to MongoDB Atlas!") },
  err => { console.log("Error connecting to MongoDB Atlas:", err) }
);


app.use(express.json())

const clinicRouter = require('./routes/api')
app.use('/api',clinicRouter)
app.listen(3000, ()=> console.log('Server Started'))