import request from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import pool from '../config/connection';

chai.use(chaiHttp);

chai.should();
let adminToken, userToken = ' ';
let InvalidToken = 'ThisisAnInvalidToken';
let userId, meetupId, questionId;


describe('Testing user endpoints', () => {

  before((done) => {

    done();
  })
  after((done) => {

    const testDb = `DELETE FROM users;`;
    pool.query(testDb)
      .then((res) => {
      })
      .catch((err) => {
      })
    done();
  })
  describe('Post user', () => {
    const validateAdmin = {
      firstname: ' ',
      lastname: '',
      email: 'clarabush@gmail.com'
    };
    const admin = {
      firstname: 'Emanuel',
      lastname: 'Bush',
      othername: 'KingEma',
      email: 'emabush@gmail.com',
      username: 'Emabushking',
      password: 'bonjourema'
    };

    const simpleUser = {
      firstname: 'Clara',
      lastname: 'Bush',
      othername: 'QueenClara',
      email: 'clara@gmail.com',
      username: 'ClaraBush',
      password: '1234'
    };


    // test joi validation
    it('Should not let the user signup without filling all the fields', (done) => {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(validateAdmin)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    // test the existing mail
    it('Should not let the user signup with the existing mail adress', (done) => {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          email: 'emabush@gmail.com'
        })
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    //sign up
    it('Should let the Admin signup', (done) => {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(admin)
        .set('Accept', 'application/json')
        .end((err, res) => {
          userId = res.body.data.id_user;
          parseInt(userId, 10);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.data.firstname.should.be.eql('Emanuel');
          res.body.data.lastname.should.be.eql('Bush');
          res.body.data.othername.should.be.eql('KingEma');
          res.body.data.email.should.be.eql('emabush@gmail.com');
          res.body.data.username.should.be.eql('Emabushking');
          res.body.token.should.be.a('string');
          if (err) return done(err);
          done();
        });
    });

    it('Should let the User signup', (done) => {
      request(app)
        .post('/api/v1/users/auth/signup')
        .send(simpleUser)
        .set('Accept', 'application/json')
        .end((err, res) => {
          userId = res.body.data.id_user;
          parseInt(userId, 10);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.data.firstname.should.be.eql('Clara');
          res.body.data.lastname.should.be.eql('Bush');
          res.body.data.othername.should.be.eql('QueenClara');
          res.body.data.email.should.be.eql('clara@gmail.com');
          res.body.data.username.should.be.eql('ClaraBush');
          res.body.token.should.be.a('string');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Login user', () => {
    const validateAdminLogin = {
      email: ' ',
      password: ' '
    };
    const adminInvalidPass = {
      email: 'emabush@gmail.com',
      password: 'invalipassword'
    };
    const loginAdmin = {
      email: 'emabush@gmail.com',
      password: 'bonjourema'
    };
    const loginUser = {
      email: 'clara@gmail.com',
      password: '1234'
    };
    // test joi validation
    it('Should not let the user login without filling all the fields', (done) => {
      request(app)
        .post('/api/v1/users/auth/login')
        .send(validateAdminLogin)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    // test the invalid password
    it('Should not let the user login with a invalid password', (done) => {
      request(app)
        .post('/api/v1/users/auth/login')
        .send(adminInvalidPass)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    //login
    it('Should let the Admin login', (done) => {
      request(app)
        .post('/api/v1/users/auth/login')
        .send(loginAdmin)
        .set('Accept', 'application/json')
        .end((err, res) => {
          adminToken = res.body.token;
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.user.email.should.be.eql('emabush@gmail.com');
          res.body.token.should.be.a('string');
          if (err) return done(err);
          done();
        });
    });

    it('Should let the User login', (done) => {
      request(app)
        .post('/api/v1/users/auth/login')
        .send(loginUser)
        .set('Accept', 'application/json')
        .end((err, res) => {
          userToken = res.body.token;
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.user.email.should.be.eql('clara@gmail.com');
          res.body.token.should.be.a('string');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('user get request', () => {

    it('Should not let the admin fetch all users without token', (done) => {
      request(app)
        .get('/api/v1/users')
        .end((err, res, next) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(401);
          res.body.message.should.be.eql('Unauthorised user');
          done();
        });
    });
    it('Should not let the admin fetch all users with the invalid token', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('Authorization', InvalidToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(403);
          res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
          done();
        });
    });

    it('Should let the Admin(users) fetch all users', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(200);
          res.body.data[0].firstname.should.be.eql('Emanuel');
          res.body.data[0].lastname.should.be.eql('Bush');
          res.body.data[0].othername.should.be.eql('KingEma');
          res.body.data[0].email.should.be.eql('emabush@gmail.com');
          res.body.data[0].username.should.be.eql('Emabushking');
          done();
        })
    });

  });

  describe('Get user by id request', () => {

    it('Should not let the admin get a user by id without token', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .end((err, res, next) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(401);
          res.body.message.should.be.eql('Unauthorised user');
          done();
        });
    });
    it('Should not let the admin get a given user with the invalid token', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .set('Authorization', InvalidToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(403);
          res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
          done();
        });
    });

    it('Should not let get a user with a wrong id', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(404);
          done();
        })
    });
    it('Should let the admin get a given user ', (done) => {
      request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(200);
          done();
        })
    });

  });

  describe('Update user request', () => {

    const user = {
      firstname: 'Emanuel',
      lastname: 'Bush',
      othername: 'KingEma',
      email: 'emabush@gmail.com',
      username: 'Emabushking',
      password: 'bonjourema'
    };

    it('Should not let the admin update a given user without token', (done) => {
      request(app)
        .put('/api/v1/users/1')
        .end((err, res, next) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(401);
          res.body.message.should.be.eql('Unauthorised user');
          done();
        });
    });
    it('Should not let the admin update a given user with the invalid token', (done) => {
      request(app)
        .put('/api/v1/users/1')
        .set('Authorization', InvalidToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(403);
          res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
          done();
        });
    });

    it('Should not let the admin update a user with a wrong id', (done) => {
      request(app)
        .put('/api/v1/users/1')
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(404);
          done();
        })
    });
    it('Should let the admin update a given user ', (done) => {
      request(app)
        .put(`/api/v1/users/${userId}`)
        .send(user)
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(200);
          res.body.data[0].firstname.should.be.eql('Emanuel');
          res.body.data[0].lastname.should.be.eql('Bush');
          res.body.data[0].othername.should.be.eql('KingEma');
          res.body.data[0].email.should.be.eql('emabush@gmail.com');
          res.body.data[0].username.should.be.eql('Emabushking');
          done();
        })
    });

  });

  describe('Get user by username request', () => {

    it('Should not let the admin get a user by username without token', (done) => {
      request(app)
        .get('/api/v1/users/username/clara')
        .end((err, res, next) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(401);
          res.body.message.should.be.eql('Unauthorised user');
          done();
        });
    });
    it('Should not let the admin get a given user with the invalid token', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .set('Authorization', InvalidToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(403);
          res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
          done();
        });
    });

    it('Should not let get a user with a wrong username', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(404);
          done();
        })
    });
    it('Should let the admin get a given user by his name', (done) => {
      request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(200);
          done();
        })
    });

  });

  describe('Delete user by id request', () => {

    it('Should not let the admin delete a user without token', (done) => {
      request(app)
        .delete('/api/v1/users/1')
        .end((err, res, next) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(401);
          res.body.message.should.be.eql('Unauthorised user');
          done();
        });
    });
    it('Should not let the admin delete a given user with the invalid token', (done) => {
      request(app)
        .delete('/api/v1/users/1')
        .set('Authorization', InvalidToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(403);
          res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
          done();
        });
    });

    it('Should not let delete a user with a wrong id', (done) => {
      request(app)
        .delete('/api/v1/users/1')
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(404);
          done();
        })
    });
    it('Should let the admin delete a given user by his id', (done) => {
      request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', adminToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.status.should.be.eql(200);
          done();
        })
    });

  });
  describe('Meetup endpoint', () => {

    describe('Post a meetup', () => {
      const meetup = {
        location: 'Kist University',
        image: ['1.png', '2.png'],
        topic: 'Brilliance is evenly distributed',
        happeningon: '2019-03-23',
        tags: ['Coding', 'opportunity', 'world']
      };

      const meetupValidate = {
        location: ' ',
        image: ['1.png', '2.png'],
        topic: ' ',
        happeningon: ' ',
        tags: ['Coding', 'opportunity', 'world']
      };

      it('Should not let the Admin create a meetup without token', (done) => {
        request(app)
          .post('/api/v1/meetups/')
          .send(meetup)
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the Admin create a meetup with an invalid token', (done) => {
        request(app)
          .post('/api/v1/meetups/')
          .set('Authorization', InvalidToken)
          .send(meetup)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should not let a simple user create a meetup', (done) => {
        request(app)
          .post('/api/v1/meetups/')
          .send(meetup)
          .set('Authorization', userToken)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should not let the admin to create a meetup without fill all the fields', (done) => {
        request(app)
          .post('/api/v1/meetups/')
          .send(meetupValidate)
          .set('Authorization', adminToken)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('Should let the Admin create a meetup', (done) => {
        request(app)
          .post('/api/v1/meetups/')
          .send(meetup)
          .set('Authorization', adminToken)
          .expect(201)
          .end((err, res) => {
            meetupId = res.body.data[0].id_meetup;
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Post a meetup Rsvp', () => {
      const meetupRsvp = {
        id_meetup: 1,
        id_user: userId,
        response: 'Yes'
      };

      const meetupRsvpValidate = {
        id_meetup: ' ',
        id_user: ' ',
        response: ' '
      };

      it('Should not let the Admin create a meetupRsvp without token', (done) => {
        request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(meetupRsvp)
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the Admin create a meetupRsvp with an invalid token', (done) => {
        request(app)
          .post('/api/v1/meetups/1/rsvps')
          .set('Authorization', InvalidToken)
          .send(meetupRsvp)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should not let a simple user create a meetupRsvp', (done) => {
        request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(meetupRsvp)
          .set('Authorization', userToken)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should not let the admin create a meetupRsvp without fill all the fields', (done) => {
        request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(meetupRsvpValidate)
          .set('Authorization', adminToken)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should not let the admin create a meetupRsvp with fill a wrong meetup id', (done) => {
        request(app)
          .post('/api/v1/meetups/90000/rsvps')
          .send(meetupRsvp)
          .set('Authorization', adminToken)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('Should let the Admin create a meetupRsvp', (done) => {
        request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(meetupRsvp)
          .set('Authorization', adminToken)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Post question request', () => {
      const question = {
        id_user: userId,
        id_meetup: 2,
        title: 'Marvel studio movies',
        body: 'Thanos is actually the king, he kills all avengers'
      };
      const questionValidate = {
        id_user: ' ',
        id_meetup: ' ',
        title: ' ',
        body: ' '
      };

      it('Should not let the User post a question without token', (done) => {
        request(app)
          .post('/api/v1/meetups/2/questions')
          .send(question)
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the User post a question with an invalid token', (done) => {
        request(app)
          .post('/api/v1/meetups/2/questions')
          .set('Authorization', InvalidToken)
          .send(question)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should not let the User post a question without fill all the fields', (done) => {
        request(app)
          .post('/api/v1/meetups/2/questions')
          .send(questionValidate)
          .set('Authorization', userToken)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should not let the User post a question with a wrong meetup id', (done) => {
        request(app)
          .post('/api/v1/meetups/90000/questions')
          .send(question)
          .set('Authorization', userToken)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('Should let the User post a question according to a given meetup', (done) => {
        request(app)
          .post('/api/v1/meetups/2/questions')
          .send(question)
          .set('Authorization', userToken)
          .expect(201)
          .end((err, res) => {
            questionId = res.body.data[0].id_question;
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Fetch all meetups', () => {

      it('Should not let the Admin(User) to get all meetups without a token', (done) => {
        request(app)
          .get('/api/v1/meetups/')
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the Admin(User) fetch all meetups with an invalid token', (done) => {
        request(app)
          .get('/api/v1/meetups/')
          .set('Authorization', InvalidToken)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should let the Admin(User) fetch all meetups', (done) => {
        request(app)
          .get('/api/v1/meetups/')
          .set('Authorization', adminToken)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Fetch all questions request', () => {

      it('Should not let the User fetch all questions without token', (done) => {
        request(app)
          .get('/api/v1/meetups/2/questions')
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the User getch all questions with an invalid token', (done) => {
        request(app)
          .get('/api/v1/meetups/2/questions')
          .set('Authorization', InvalidToken)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should let the User fetch all questions according to a given meetup', (done) => {
        request(app)
          .get('/api/v1/meetups/2/questions')
          .set('Authorization', userToken)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Fetch all upcoming meetups', () => {

      it('Should not let the Admin(User) to get all upcoming meetups without a token', (done) => {
        request(app)
          .get('/api/v1/meetups/upcoming')
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the Admin(User) fetch all upcoming meetups with an invalid token', (done) => {
        request(app)
          .get('/api/v1/meetups/upcoming')
          .set('Authorization', InvalidToken)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should let the Admin(User) fetch all upcoming meetups', (done) => {
        request(app)
          .get('/api/v1/meetups/upcoming')
          .set('Authorization', adminToken)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Get one meetup request', () => {

      it('Should not let the Admin(User) to get one meetup without a token', (done) => {
        request(app)
          .get('/api/v1/meetups/1')
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the Admin(User) get one meetup with an invalid token', (done) => {
        request(app)
          .get('/api/v1/meetups/1')
          .set('Authorization', InvalidToken)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should not let the Admin(User) get a meetup with a wrong id', (done) => {
        request(app)
          .get('/api/v1/meetups/48000')
          .set('Authorization', adminToken)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should let the Admin(User) get one meetups', (done) => {
        request(app)
          .get('/api/v1/meetups/1')
          .set('Authorization', adminToken)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Update meetup request', () => {

      const meetup = {
        location: 'Kist University',
        image: ['1.png', '2.png'],
        topic: 'Brilliance is evenly distributed',
        happeningon: '2019-03-23',
        tags: ['Coding', 'opportunity', 'world']
      };

      const updateMeetupValidate = {
        location: ' ',
        image: ['1.png', '2.png'],
        topic: ' ',
        happeningon: ' ',
        tags: ['Coding', 'opportunity', 'world']
      };

      it('Should not let the Admin update a meetup without a token', (done) => {
        request(app)
          .put('/api/v1/meetups/1')
          .send(meetup)
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the Admin update a meetup with an invalid token', (done) => {
        request(app)
          .put('/api/v1/meetups/1')
          .set('Authorization', InvalidToken)  
          .send(meetup)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should not let the Admin update a meetup with a wrong id', (done) => {
        request(app)
          .put('/api/v1/meetups/48000')
          .set('Authorization', adminToken)
          .send(meetup)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should not let the admin update a meetup without fillig all the fields', (done) => {
        request(app)
          .put('/api/v1/meetups/1')
          .send(updateMeetupValidate)
          .set('Authorization', adminToken)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should not let a simple user update a meetup', (done) => {
        request(app)
          .put('/api/v1/meetups/1')
          .send(meetup)
          .set('Authorization', userToken)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should let the Admin update a meetups', (done) => {
        request(app)
          .put('/api/v1/meetups/1')
          .set('Authorization', adminToken)
          .send(meetup)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

   describe('Delete meetup request', () => {

      it('Should not let the Admin delete a meetup without a token', (done) => {
        request(app)
          .delete(`/api/v1/meetups/${meetupId}`)
          .end((err, res, next) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(401);
            res.body.message.should.be.eql('Unauthorised user');
            done();
          });
      });
      it('Should not let the Admin delete a meetup with an invalid token', (done) => {
        request(app)
          .delete(`/api/v1/meetups/${meetupId}`)
          .set('Authorization', InvalidToken)  
          .end((err, res) => {
            res.body.should.be.a('object');
            res.status.should.be.eql(403);
            res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
            done();
          });
      });

      it('Should not let the Admin delete a meetup with a wrong id', (done) => {
        request(app)
          .delete('/api/v1/meetups/48000')
          .set('Authorization', adminToken)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should not let a simple user delete a meetup', (done) => {
        request(app)
          .delete(`/api/v1/meetups/${meetupId}`)
          .set('Authorization', userToken)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      it('Should let the Admin delete a meetup', (done) => {
        request(app)
          .delete(`/api/v1/meetups/${meetupId}`)
          .set('Authorization', adminToken)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Test question endpoints', ()=>{

      describe('Post a comment to a given question', () => {
        const comment = {
          id_user: userId,
          id_question: 2,
          comment: 'What all people want to know is where Thanos kept all Avengers, especially IronMan'
        };
        const commentValidate = {
          id_user: ' ',
          id_meetup: ' ',
          comment: ' '
        };
  
        it('Should not let the User post a comment without token', (done) => {
          request(app)
            .post('/api/v1/questions/2/comments')
            .send(comment)
            .end((err, res, next) => {
              res.body.should.be.a('object');
              res.status.should.be.eql(401);
              res.body.message.should.be.eql('Unauthorised user');
              done();
            });
        });
        it('Should not let the User post a comment with an invalid token', (done) => {
          request(app)
            .post('/api/v1/questions/2/comments')
            .set('Authorization', InvalidToken)
            .send(comment)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.status.should.be.eql(403);
              res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
              done();
            });
        });
  
        it('Should not let the User post a comment without filling all the fields', (done) => {
          request(app)
            .post('/api/v1/questions/2/comments')
            .send(commentValidate)
            .set('Authorization', userToken)
            .expect(400)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
  
        it('Should not let the User post a comment with a wrong question id', (done) => {
          request(app)
            .post('/api/v1/questions/90000/comments')
            .send(comment)
            .set('Authorization', userToken)
            .expect(404)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
        it('Should let the User post a comment according to a given question', (done) => {
          request(app)
            .post('/api/v1/questions/2/comments')
            .send(comment)
            .set('Authorization', userToken)
            .expect(201)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
      });

      describe('Fetch all comments request', () => {

        it('Should not let the User fetch all comments without token', (done) => {
          request(app)
            .get('/api/v1/questions/2/comments')
            .end((err, res, next) => {
              res.body.should.be.a('object');
              res.status.should.be.eql(401);
              res.body.message.should.be.eql('Unauthorised user');
              done();
            });
        });
        it('Should not let the User fetch all comments with an invalid token', (done) => {
          request(app)
            .get('/api/v1/questions/2/comments')
            .set('Authorization', InvalidToken)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.status.should.be.eql(403);
              res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
              done();
            });
        });
  
        it('Should let the User fetch all comments according to a given question', (done) => {
          request(app)
            .get('/api/v1/questions/2/comments')
            .set('Authorization', userToken)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
      });

      describe('Upvote a question request', () => {

        const upvote = {
          id_user: userId,
          id_question: questionId, 
          votes: true
        };
  
        const unauthorisedUpvote = {
          id_user: userId,
          id_question: 1,
          votes: true
        };
  
        it('Should not let the User upvote a question without a token', (done) => {
          request(app)
            .patch(`/api/v1/questions/${questionId}/upvote`)
            .send(upvote)
            .end((err, res, next) => {
              res.body.should.be.a('object');
              res.status.should.be.eql(401);
              res.body.message.should.be.eql('Unauthorised user');
              done();
            });
        });
        it('Should not let the User upvote a question with an invalid token', (done) => {
          request(app)
            .patch(`/api/v1/questions/${questionId}/upvote`)
            .set('Authorization', InvalidToken)  
            .send(upvote)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.status.should.be.eql(403);
              res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
              done();
            });
        });
  
        it('Should not let the Admin upvote a question with a wrong id', (done) => {
          request(app)
            .patch('/api/v1/questions/48000/upvote')
            .set('Authorization', userToken)
            .send(upvote)
            .expect(404)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });

        it('Should not let the User upvote a question twice', (done) => {
          request(app)
            .patch('/api/v1/questions/1/upvote')
            .set('Authorization', userToken)
            .send(unauthorisedUpvote)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
  
        it('Should let the User upvote a question', (done) => {
          request(app)
            .patch(`/api/v1/questions/${questionId}/upvote`)
            .set('Authorization', userToken)
            .send(upvote)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
      });

      describe('Downvote a question request', () => {

        const downvote = {
          id_user: 3,
          id_question: 3, 
          votes: false
        };
  
        const unauthorisedDownvote = {
          id_user: userId,
          id_question: 1,
          votes: false
        };
  
        it('Should not let the User downvote a question without a token', (done) => {
          request(app)
            .patch(`/api/v1/questions/${questionId}/downvote`)
            .send(downvote)
            .end((err, res, next) => {
              res.body.should.be.a('object');
              res.status.should.be.eql(401);
              res.body.message.should.be.eql('Unauthorised user');
              done();
            });
        });
        it('Should not let the User downvote a question with an invalid token', (done) => {
          request(app)
            .patch(`/api/v1/questions/${questionId}/downvote`)
            .set('Authorization', InvalidToken)  
            .send(downvote)
            .end((err, res) => {
              res.body.should.be.a('object');
              res.status.should.be.eql(403);
              res.body.message.should.be.eql('Authentication failed. Please input a valid token.');
              done();
            });
        });
  
        it('Should not let the Admin downvote a question with a wrong id', (done) => {
          request(app)
            .patch('/api/v1/questions/48000/downvote')
            .set('Authorization', userToken)
            .send(downvote)
            .expect(404)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });

        it('Should not let the User downvote a question twice', (done) => {
          request(app)
            .patch('/api/v1/questions/1/downvote')
            .set('Authorization', userToken)
            .send(unauthorisedDownvote)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
  
        it('Should let the User downvote a question', (done) => {
          request(app)
            .patch(`/api/v1/questions/3/downvote`)
            .set('Authorization', userToken)
            .send(downvote)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
      });

    })

  })

});
