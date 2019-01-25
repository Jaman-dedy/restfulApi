/* eslint-disable class-methods-use-this */
import joi from 'joi';

class Validate {
  userValidate(user) {
    const options = {
      allowUnknown: true,
      abortEarly: false
    };
    const schema = {
      firstname: joi.string().required().min(4).trim(),
      lastname: joi.string().required().min(4).trim(),
      othername: joi.string().required().min(4).trim(),
      email: joi.string().required().min(4).trim(),
      phonenumber: joi.string().required().min(5).trim(),
      username: joi.string().required().min(4).trim(),
      password: joi.string().required().min(3).trim()
    };
    return joi.validate(user, schema, options);
  }

  loginValidate(login) {
    const options = {
      allowUnknown: true,
      abortEarly: false
    };
    const schema = {
      
      email: joi.string().required().min(4).trim(),
      password: joi.string().required().min(3).trim()
    };
    return joi.validate(login, schema, options);
  }

  meetupValidate(meetup) {
    const options = {
      allowUnknown: true,
      abortEarly: false
    };
    const schema = {
      location: joi.string().required().min(4).trim(),
      topic: joi.string().required().min(4).trim(),
      happeningon: joi.date().required()
    };
    return joi.validate(meetup, schema, options);
  }

  questionValidate(question) {
    const options = {
      allowUnknown: true,
      abortEarly: false
    };
    const schema = {

      title: joi.string().required().min(5).trim(),
      body: joi.string().required().min(10).trim()

    };
    return joi.validate(question, schema, options);
  }

  rsvpValidate(rsvp) {
    const options = {
      allowUnknown: true,
      abortEarly: false
    };
    const schema = {

      response: joi.string().required().min(2).trim()

    };
    return joi.validate(rsvp, schema, options);
  }
}

module.exports = new Validate();
