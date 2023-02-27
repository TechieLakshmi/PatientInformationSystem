const wardmanager = require("../controller/ward.controller.js");
var express = require('express');
var router = express.Router();

// Assign ward against patient in the system
router.post('/admit', (req, res)=> {
    const userVerified = wardmanager.validateToken(req, res);
    if(!userVerified){
        res.status(401);
        res.json({'status':'error', 'message':'Invalid Token or user may not have access to this.'});
    }
    else{
        wardmanager.assignWard(req, (result)=> {
        res.json(result);
    })}
})


// Assign ward against patient in the system
router.post('/discharge', (req, res)=> {
    const userVerified = wardmanager.validateToken(req, res);
    if(!userVerified){
        res.status(401);
        res.json({'status':'error', 'message':'Invalid Token or user may not have access to this.'});
    }
    else{
        wardmanager.releaseWard(req, (result)=> {
            res.json(result);
        })}
})

// List all  ward 
router.get('/wards', (req, res)=> {

    const userVerified = wardmanager.validateToken(req, res);
    if(!userVerified){
        res.status(401);
        res.json({'status':'error', 'message':'Invalid Token or user may not have access to this.'});
    }
    else{
        wardmanager.listallWards (req, (result)=> {
            res.json(result);
        })}
})

// get all occuped ward  
router.get('/occupancy', (req, res)=> {
    const userVerified = wardmanager.validateToken(req, res);
    if(!userVerified){
        res.status(401);
        res.json({'status':'error', 'message':'Invalid Token or user may not have access to this.'});
    }
    else{
        wardmanager.findAllOccupiedwards(req, (result)=> {
            res.json(result);
        })}
})

module.exports = router;
