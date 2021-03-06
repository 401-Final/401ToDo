const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost/bigtodo-test';

const connection = require('../../lib/setup-mongoose');
const db = require('../db');
const app = require('../../lib/app');

describe ('Users API', () => {

  it.skip ('fails test because no tests are written', (done) => {
    expect(true).to.not.be.ok;
    done();
  });

  before(db.drop(connection));

  const request = chai.request(app);

  const testUser = {
    username: 'testuser',
    password: 'testpass',
    email: 'user@test.com'
  };

  let authHeader = null;    
  before(() => {
    request
      .post('/api/auth/signup')
      .send(testUser)
      .then(({ body }) => {
        expect(body.token).to.be.ok;
        authHeader = { Authorization: `Bearer ${body.token}` };
      });
  });

  let userId = null;

  it.skip ('GET /api/users/:id', () => {
    request
      .get(`/api/users/${userId}`)
      .set(authHeader)
      .then(res => expect(res.body).to.deep.equal([]));
  });

  // after((done) => {
  //   connection.close(done);
  // });

});