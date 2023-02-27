const mongoose = require("mongoose");
const WardSchema = new mongoose.Schema({
    //Ward details
    wardNumber: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
          if (value < 1 ) throw new Error("Invalid Ward number ");
          if (value >36 ) throw new Error("Exceeded maximum Ward number ");
        },
      },
    wardDepartment:String,
    //Doctor details
    doctorIncharge: {
        type: String
    },
    //Nurse details
    staffIncharge: {
      type: String
    },
    staffContactNumber:Number,
    //Patient details
    patientName: {
        type: String
    },
    patientcontactNumber:Number,
    //Bystander details
    admissionTime: {
      type: Date,
      validate(value) {
        if (!value instanceof Date)
            throw new Error("Invalid date format");
        else
            console.log("Date time ok")    
      }
    },
    bedNumber:  {
      type: Number,
      required: true,
      default: 0,
      validate(value) {
        if (value < 1 ) throw new Error("Invalid bed number ");
        if (value >10 ) throw new Error("Exceeded maximum bed number ");
      },
    },
    bedOccupancy:Boolean
},{versionKey:false});
const Wardmodel = mongoose.model("ward", WardSchema);
module.exports = Wardmodel;
