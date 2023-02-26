const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    designation: { type: String, required: false },
    experience: { type: String, required: false },
    department: { 
        type: String, 
        required: false, 
        enum: [
            'Medicine', 
            'Surgery', 
            'Orthopedics', 
            'Pediatrics', 
            'ENT', 
            'Ophthalmology', 
            'Gynecology', 
            'Dermatology', 
            'Oncology'
        ] 
    },
    role: { type: String, required: true },
    createdAt: { type: Date, required: true },
},{versionKey:false});

module.exports = {
    user: mongoose.model('user', user )
}
