var supertest = require('supertest'),
  expect = require('chai').expect,
  app = require('../../app'),
  faker = require('faker'),
  User = require('../../models/users'),
  api = supertest(app);

const propUser = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};

let userResponse;

describe('USERS', () => {
  describe('POST /users', () => {
    before((done) => {
      api
        .post('/users')
        .send(propUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          if (res) {
            userResponse = res.body;
            expect(res.body.user).to.not.equal(null);
            expect(res.body.success).to.equal(true);
            expect(res.body.error).to.equal(null);
            done();
          }
        });
    });

    it('should return a user that matches our dummy/prop user ', (done) => {
      expect(userResponse.user.username).to.equal(propUser.username);
      expect(userResponse.user.password).to.equal(propUser.password);
      expect(userResponse.user.firstName).to.equal(propUser.firstName);
      expect(userResponse.user.lastName).to.equal(propUser.lastName);
      expect(userResponse.user.email).to.equal(propUser.email);
      done();
    });

    it('should return a success message that is true', (done) => {
      expect(userResponse.success).to.be.true;
      done();
    });

    it('should return a null error message', (done) => {
      expect(userResponse.error).to.be.null;
      done();
    });
    
    it('should create a user that can be found in the database', function (done) {
      this.timeout(3000);
      User.findOne({
        _id: userResponse.user._id
      }, (err, user) => {
        expect(user.email).to.equal(userResponse.user.email);
        done();
      });
    });
  });

  after((done) => {
    User
      .find()
      .remove()
      .exec(() => {
        done();
      });
  });
});
