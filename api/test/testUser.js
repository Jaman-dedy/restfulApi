const request = require('supertest');
const assert = require('chai').assert;

const app = require('../../app');


//const router = express.Router();

describe('homepage', function(){
    it("welcomes the user", function(done){
        request(app).get("/users")
        .expect(200)
        .expect(/json/, done)
    })
})
