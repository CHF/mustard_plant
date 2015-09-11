var supertest = require('supertest'),
  expect = require('chai').expect,
  app = require('../../app'),
  faker = require('faker'),
  api = supertest(app);

describe('USERS', function() {
  describe('POST /users', function() {
    it('should let you create users w/ post', (done) => {
      api
        .post('/users')
        .send({
          username: faker.internet.userName,
          password: faker.internet.password,
          email: faker.internet.email,
          firstName: faker.name.firstname,
          lastName: faker.name.lastName,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.user).to.not.equal(null);
          expect(res.body.success).to.equal(true);
          expect(res.body.error).to.equal(null);
          done(err, res);
        });
    });
  });
});
