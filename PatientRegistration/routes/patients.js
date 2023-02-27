const express = require("express");
const router = express.Router();
const Patient = require("../services/patientService");


// post patient information in the system as part of intial patient registration 
router.post('/register', (req, res)=> {
    //validate token
    const userVerified = Patient.validateToken(req, res);
    if(!userVerified){
        res.status(401);
        res.json({'status':'error', 'message':'Invalid Token or user may not have access to this.'});
    }else{ 
      Patient.register(req, res);
    }
})
//Get patient information using the phone number after intial patient registration
router.get('/patients/:phoneNo', (req, res)=> {
    //validate token
    const userVerified = Patient.validateToken(req, res);
    if(!userVerified){
        res.status(401);
        res.json({'status':'error', 'message':'Invalid Token or user may not have access to this.'});
    }else{ 
      Patient.retrieve(req, res);
    }
})

//Update patient information using the phone number
router.put('/patients', (req, res)=> {
    //validate token
    const userVerified = Patient.validateToken(req, res);
    if(!userVerified){
        res.status(401);
        res.json({'status':'error', 'message':'Invalid Token or user may not have access to this.'});
    }else{ 
      Patient.update(req, res);
    }
})

//Delete patient information using the phone number
router.delete('/patients/:phoneNo', (req, res)=> {
    //validate token
    const userVerified = Patient.validateToken(req, res);
    if(!userVerified){
        res.status(401);
        res.json({'status':'error', 'message':'Invalid Token or user may not have access to this.'});
    }else{ 
      Patient.remove(req, res);
    }
})

module.exports = router;
