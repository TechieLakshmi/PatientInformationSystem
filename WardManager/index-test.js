const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('POST /admit', () => {
  it('should return error if wardNumber is greater than 36', (done) => {
    chai.request("http://localhost:3002")
      .post('/admit')
      .send({
        wardNumber: 37,
        doctorIncharge: "JOHN",
        staffIncharge: "Ella",
        staffContactNumber: 971557852920,
        patientName: "Ben",
        patientcontactNumber: 971557852921,
        admissionTime: "2022-03-25 12:30:00",
        bedNumber: 3,
        bedOccupancy: true
      })
      .set('TOKEN_HEADER_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyaXphaWRpQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiJyYXphMTIzIiwiZGVzaWduYXRpb24iOiJkb2N0b3IiLCJpYXQiOjE2NzkwNjI3NDQsImV4cCI6MTY3OTA2NjM0NH0.8uQ9SvtpDOgZST5BQzwYhZgzoB-x1b6WZaTwzD5DCHo')
      .end((err, res) => {
        expect(res.body.err).to.have.property('message').eql('ward validation failed: wardNumber: Exceeded maximum Ward number ')
        done();
      });
  });

  it('should return error if ward already occupied', (done) => {
    chai.request("http://localhost:8080")
      .post('/admit')
      .send({
        wardNumber: 36,
        doctorIncharge: "JOHN",
        staffIncharge: "Ella",
        staffContactNumber: 971557852920,
        patientName: "Ben",
        patientcontactNumber: 971557852921,
        admissionTime: "2022-03-25 12:30:00",
        bedNumber: 3,
        bedOccupancy: true
      })
      .set('TOKEN_HEADER_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyaXphaWRpQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiJyYXphMTIzIiwiZGVzaWduYXRpb24iOiJkb2N0b3IiLCJpYXQiOjE2NzkwNjI3NDQsImV4cCI6MTY3OTA2NjM0NH0.8uQ9SvtpDOgZST5BQzwYhZgzoB-x1b6WZaTwzD5DCHo')
      .end((err, res) => {
        expect(res.body).to.have.property('message').eql("Ward aleady occupied")
        done();
      });
  });

});