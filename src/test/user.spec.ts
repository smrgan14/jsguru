// eslint-disable-next-line import/no-extraneous-dependencies
import * as chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import env from '../config/env';
import 'chai-http/request';

chai.use(chaiHttp);
// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
const loginUserApi = `${env.baseUrl}:${env.port}/api/v1/user/login` || 'localhost:2000/api/v1/user/login';
const createUserApi = `${env.baseUrl}:${env.port}/api/v1/user/register` || 'localhost:2000/api/v1/user/register';

describe('User login form', () => {
  it('The user should be successfully loggedin with the correct information', (done) => {
    const loginUser = {
      email: 'sandi.mrgan@live.com',
      password: 'sandi.123',
    };

    chai
      .request(loginUserApi)
      .post('/')
      .send(loginUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success', true);
        done();
      });
  });

  it('An error should be returned if required fields are missing during login', (done) => {
    const incompleteLoginUser = {
    // Required fields are missing
    // Example for login: email and password are mandatory
      email: 'sandi.mrgan@live.com',
      password: 'sandi.123',
    };

    chai
      .request(loginUserApi)
      .post('/')
      .send(incompleteLoginUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('success', false);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Form for creating a new user', () => {
  it('A new user should be created with the correct information', (done) => {
    const newUser = {
      firstName: 'User',
      lastName: 'Testuser',
      email: 'user.testuser@live.com',
      password: 'user.123',
      phone: '065-432-455',
    };

    chai
      .request(createUserApi)
      .post('/')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success', true);
        done();
      });
  });

  it('Treba vratiti grešku ako nedostaju obavezna polja', (done) => {
    const incompleteUser = {
      // Mandatory fields are missing
    };

    chai
      .request(createUserApi)
      .post('/')
      .send(incompleteUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('success', false);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
