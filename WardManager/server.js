const wardroute = require("./routes/ward.routes");
const mongoose = require('./utils/database.js')
const express = require("express");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//For handing the routes with ward url
app.use('/',wardroute);
const PORT = process.env.PORT || 8080;
const db = mongoose.connect()
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function() {
    console.log("Successfully connected to database");
    app.listen(PORT, ()=> {
        console.log(`Ward Manager service running on port :${PORT}`);
    });
});
