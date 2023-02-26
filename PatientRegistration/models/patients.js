const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type:String, required: false },
    lastName: { type:String, required: false },
    email: { type:String, required: false },
    age: { type:String, required: false },
    doctor: { type:String, required: false },
    diagnosis: { type:String, required: false },
    phoneNo: { type:String, required: false },
    address: { type:String, required: false },
    emirate: { type:String, required: false },
    emergencyContactPerson:{ type:String, required: false },
    emergencyContactPhone:{ type:String, required: false },
    insuranceProvider:{ type:String, required: false },
    insurancePolicyNumber:{ type:String, required: false }
},{versionKey: false})
module.exports = mongoose.model('Patient',PatientSchema);