const chai = require("chai");
const chaiHttp = require("chai-http");
const format = require('string-format')
format.extend(String.prototype, {})
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const jwt = require('jsonwebtoken');
const expect = chai.expect;
const assert = chai.assert;


// importing external modules
let patient = require("./services/patientService.js")
let server = require('./routes/patients')
let patientsuri = require("./models/patients.js")
//connecting to mongoDB
const {MONGO_DB_URI} = require("./config/databaseuri");
const mongoose = require("mongoose");
mongoose.connect(MONGO_DB_URI).then(
() => { console.log("Successfully connected to MongoDB Atlas!") },
err => { console.log("Error connecting to MongoDB Atlas:", err) }
);

//assertion
chai.use(chaiHttp);


const users = { email: "nihanjs@hotmail.com", password: "nihan@1213", 'designation':"clerk" };
const tokens = generateToken(users);
function generateToken(users) {

     const secretKey = 'PTS_Secret_Key';
     const tokens = jwt.sign(users, secretKey, { expiresIn: '1h' });
     return tokens;
 }

//unit testing for registration of patient
describe("test / route", () =>{
    it('should register a patient information', async() => {
    chai.request('http://localhost:6000')
        .post('/register')
        .set({"TOKEN_HEADER_KEY" : tokens})
        .send({    
        firstName: 'Hari ks',
        lastName: 'hari',
        email: 'hariks@gmail.com',
        age: '23',
        doctor: 'Thara',
        diagnosis: 'Body Pains',
        phoneNo: '0563393837',
        address: 'barsha heights ',
        emirate: 'dubai',
        emergencyContactPerson: 'rakesh',
        emergencyContactPhone: '0588916312',
        insuranceProvider: 'oman',
        insurancePolicyNumber: '555289786111'
            })
            .end((err, res) => {
                if (err) {
                  console.log(err);
                  assert.fail(err);
                }
                assert.equal(res.status, 200);
     })
})

})