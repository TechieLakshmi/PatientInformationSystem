const express = require('express')
const router = express.Router()
const res = require('express/lib/response')
const { json } = require('express/lib/response')
const db = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


// Use body-parser middleware to parse request body
router.use(bodyParser.json())

// GET route to retrieve all records
router.get('/records', async (req, res) => {
    try {
      const records = await db.user.find({});
      res.json(records);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//register a user
router.post('/register/:role', register);

//login registered and verified user 
router.post('/login', authenticate);

//validate a user toknen
router.post('/validateToken/', validateToken);

function register(req, res, next) {
    registerUser(req).then((resp) => {
        if(resp === 401){
            res.json( { 
                message: 'User Already exists',
                StatusCode: resp
             })
        } else {
            res.json( { 
                message : resp === 201 ? 'Staff successfully registered' : 'user successfully registered',
                StatusCode: resp
             })
        } 
    }
    ).catch(next)
}
async function registerUser(req) {
    // console.log('query =>', req.params,'body =>',req.body)
    let isUserExists = await db.user.findOne({"email":req.body.email})
    console.log(isUserExists)

    if(!isUserExists){
        let params = req.body
        params.role = req.params.role
        const account = new db.user(params)
        account.password = hash(params.password)
        account.createdAt = Date.now()
        await account.save(account)
        return req.params.role === "staff" ? 201 : 202
    }else{
        return 401
    }
}

function hash(password) {
    return bcrypt.hashSync(password, 10)
}

async function authenticate(req, res, next) {
    const { email, password } = req.body;
    try {
      const token = await authenticateUser({ email, password });
      res.json({ message: "login successful", token });
    } catch (error) {
      next(error);
    }
  }
  
  async function authenticateUser({ email, password }) {
    const account = await db.user.findOne({ email: email });
  
    if (!account || !bcrypt.compareSync(password, account.password)) {
      throw "email or pass is incorrect";
    }
  
    // Check the user's credentials and generate a token
    const user = { email: email, password: password };
    const token = generateToken(user);
  
    // Return the token
    return token;
  }
  


router.delete('/delete/:email', (req, res, next) => {
    deleteUser(req.params.email)
      .then(() => res.json({ message: 'Record deleted successfully' }))
      .catch(next)
  })
  
async function deleteUser(email) {
    await db.user.findOneAndDelete({ email: email })
}
  
  
function generateToken(user) {

   // const secretKey = crypto.randomBytes(64).toString('hex');

    const secretKey = 'PTS_Secret_Key';
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    return token;
}


function validateToken(req, res, next) {
    const secretKey = 'PTS_Secret_Key';
    try {
        const token = req.header("TOKEN_HEADER_KEY");
        const verified = jwt.verify(token, secretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}

module.exports = router