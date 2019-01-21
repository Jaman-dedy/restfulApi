const joi = require('joi');
class Validate{
    meetupValidate(meetup){
        const schema={
            location: joi.string().required().min(4).trim(),
            images: joi.array().items(joi.string(), joi.string()),
            topic: joi.string().required().min(4).trim(),
            happeningon: joi.date().required(),
            tags:joi.array().items(joi.string(), joi.string())
        };
        return joi.validate(meetup, schema);
    }
    questionValidate(question){
        const schema={
           
            createdBy: joi.number().required(),
            meetup: joi.number().required(),
            title: joi.string().required().min(5).trim(),
            body: joi.string().required().min(10).trim()
           
        }
        return joi.validate(question, schema);
    }
    rsvpValidate(rsvp){
        const schema={           
            
                meetup: joi.number().required(),
                user: joi.number().required(),
                response: joi.string().required().min(2).trim()
           
        }
        return joi.validate(rsvp, schema);
    }

}

module.exports = new Validate();