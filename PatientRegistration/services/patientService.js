// Unique id creation for the patient registration
const mongoose = require("mongoose");

// Get instance from patient schema
const Patient = require("../models/patients");

//get jwt token
const jwt = require('jsonwebtoken');


// Expose the services for intial patient registration
module.exports = {
    register(req, res) {
        var body = req.body;
        // Checks if the patient exists or not using the phone number
        Patient.find().where('phoneNo').equals(body.phoneNo).exec()
        .then(result => {
            // If exists return the Intial patient information
            if(result.length > 0) {
                res.status(200);
                res.json({'status':'error', 'message':'Patient details already exists in the system'});
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
                patient.save().then(result => {
                    res.status(200);
                    res.json({'status':'success',
                             'message':'Patient details registered sucessfully'});
                }).catch(err=> {
                        res.status(500);
                        res.json({'status':'error','message':'Unable to register patient'});
                })
            }

        })
        .catch(err => {
            res.status(500);
            res.json({'Error':'Unable to register patient'});
        });
    },

    // Return the patient information using the phone number
    retrieve (req, res) {
        Patient.find().where('phoneNo').equals(req.params.phoneNo).exec()
        .then(result => {
            console.log(result);
            if(result.length === 0){
                res.status(200);
                res.json({'status':'error', 'message':`Unable to fetch patient with phone no ${req.params.phoneNo}`});
            }
            res.json(result[0]);
           
        })
        .catch(err => {
            console.log('error while fetching patient details ' + err);
            res.status(500);
            res.json({'status':'error', 'message':'Unable to fetch patient details'});
        });
    },

    // Update the patient information using the phone number
    update(req, res) {
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
                res.json({'status':'success',
                          'message':'Patient details are updated sucessfully'});
            }
        ).catch( err => {
            res.status(500);
            res.json({'status':'error',
            'message':'Unable tpo update patient details'});
        });
    },
    //Delete the patient information using the phone number
    remove (req, res) {
        var body = req.body;
        Patient.deleteOne({ phoneNo: body.phoneNo}, function(err, result) {
        if (err) {
            res.status(500);
            res.json({'status':'error',
            'message':'Unable to delete patient details'});
        } else {
            res.json({'status':'success',
                      'message':'Patient details are deleted sucessfully'});
        }
    });   

    },

    //validate Token to check access to clerk
    validateToken (req, res) {
        const secretKey = 'PTS_Secret_Key';
        try {
            const token = req.header("TOKEN_HEADER_KEY");
            if(!token){
                return false;
            }
            const user = jwt.verify(token, secretKey);
            if(  user && user.designation =="clerk" ){
                return true;
            }else {
                // Access Denied
                return false;
            }
        } catch (error) {
            // Access Denied
            return false;
        }

    },
}
