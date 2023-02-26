// Unique id creation for the patient registration
const mongoose = require("mongoose");

// Get instance from patient schema
const Patient = require("../models/patients");

// Expose the services for intial patient registration
module.exports = {
    register(req, cb) {
        var body = req.body;
        // Checks if the patient exists or not using the phone number
        Patient.find().where('phoneNo').equals(body.phoneNo).exec()
        .then(result => {
            // If exists return the Intial patient information
            if(result.length > 0) {
                cb(result[0]);
            } else {
                // If not then create a new patient istance
                const patient = new Patient({
                    _id: new mongoose.Types.ObjectId,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    age: body.age,
                    doctor: body.doctor,
                    diagnosis: body.diagnosis,
                    phoneNo: body.phoneNo,
                    address: body.address,
                    emirate: body.emirate,
                    emergencyContactPerson:body.emergencyContactPerson,
                    emergencyContactPhone:body.emergencyContactPhone,
                    insuranceProvider:body.insuranceProvider,
                    insurancePolicyNumber:body.insurancePolicyNumber
                });
                patient.save()
                    .then(result => {
                        cb(result);
                    })
                    .catch(err=> {
                        cb({err});
                    })
            }

        })
        .catch(err => {
            cb({err});
        });
    },

    // Return the patient information using the phone number
    retrieve (req, cb) {
        Patient.find().where('phoneNo').equals(req.params.phoneNo).exec()
        .then(result => {
            console.log(result);
            if(result.length === 0){
                result[0] = {}
            }
            cb(result[0]);
        })
        .catch(err => {
            cb({err});
        });
    },

    // Update the patient information using the phone number
    update(req, cb) {
        var body = req.body;
        const filter = { phoneNo: body.phoneNo};
        const update = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            age: body.age,
            doctor: body.doctor,
            diagnosis: body.diagnosis,
            phoneNo: body.phoneNo,
            address: body.address,
            emirate: body.emirate,
            emergencyContactPerson:body.emergencyContactPerson,
            emergencyContactPhone:body.emergencyContactPhone,
            insuranceProvider:body.insuranceProvider,
            insurancePolicyNumber:body.insurancePolicyNumber
        };

        Patient.findOneAndUpdate(filter,update,{  new: true,
        }).exec().then(
            result => {
                console.log(result);
                cb(result);
            }
        ).catch( err => {
            cb({err})
        });
    },
    //Delete the patient information using the phone number
    remove (req, cb) {
        var body = req.body;
        Patient.deleteOne({ phoneNo: body.phoneNo}, function(err, result) {
        if (err) {
            cb(err);
        } else {
            cb(result);
        }
    });   

    },
}