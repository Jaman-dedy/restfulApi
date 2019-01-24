import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const hash = bcrypt.hashSync("123");

const user = {
  firstname: 'Emmanuel',
  lastname: 'Bush',
  othername: 'King',
  email: 'emabush@gmail.com',
  phonenumber: '0789813478',
  username: 'Bush',
  password: hash
};

describe('Create User', () => {
  it('Should allow the user to signup', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        if (err) return expect(err.message);
        done();
      });
  });
});