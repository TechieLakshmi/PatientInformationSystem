const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
module.exports = {
    connect : function () {
        console.log("Connecting to database");
        mongoose.connect("mongodb+srv://user_PI:TEST123!@cluster0.slxmias.mongodb.net/PIS?retryWrites=true&w=majority");
        //mongoose.connect("mongodb+srv://hwuser:hwpwd@cluster1.ugfazva.mongodb.net/devops?retryWrites=true&w=majority");
        return mongoose.connection;
    }
}
