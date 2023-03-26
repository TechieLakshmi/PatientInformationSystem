const { assert, expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
let  server  = require("../routes/api");
const db = require('../models/user.js');
const jwt = require("jsonwebtoken");
const user = require('../models/user')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// Assertion Style
chai.should();
chai.use(chaiHttp);

// Describe your test suite
describe('User API', () => {

    // Test /register/:role route with valid data
    it('should register a user with role', (done) => {
      
      // Make a POST request with user object
      chai.request('http://localhost:3001/api/')
        .post('/register/staff')
        .send({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
          phoneNumber: 2323232
        })
        .end((err, res) => {
          // Check for status code, message and body
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('message').eql('Staff successfully registered')
          done()
        })
    })
  
    // Test /login route with valid credentials
    it('should login a registered user', (done) => {
      // Create a sample user object with existing email and password
      let user = {
        email: 'johndoe@example.com',
        password: '123456'
      }
      // Make a POST request with user object
      chai.request('http://localhost:3001/api/')
        .post('/login')
        .send(user)
        .end((err, res) => {
          // Check for status code, message and body
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('message').eql('login successful')
          done()
        })
    })

  })