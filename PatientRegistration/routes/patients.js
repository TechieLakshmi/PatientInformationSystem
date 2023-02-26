const express = require("express");
const router = express.Router();
const Patient = require("../services/patientService");

// post patient information in the system as part of intial patient registration 
router.post('/register', (req, res)=> {
    Patient.register(req, (result)=> {
        res.json(result);
    })
})

//Get patient information using the phone number after intial patient registration
router.get('/:phoneNo', (req, res)=> {
    console.log("request reached @get patient info side");
    Patient.retrieve(req, (result)=> {
        res.json(result);
    })
})

//Update patient information using the phone number
router.put('/', (req, res)=> {
    Patient.update(req, (result)=> {
        res.json(result);
    })

})

//Delete patient information using the phone number
router.delete('/', (req, res)=> {
    Patient.remove(req, (result)=> {
        res.json(result);
    })
})

module.exports = router;