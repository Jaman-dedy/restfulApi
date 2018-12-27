const express = require('express');
const router = express.Router();

const rsvps = [
    {
        "id" : 1,
        "meetup" : 1,
        "user": 1,
        "response" : 'yes'
    },
    {
        "id" : 2,
        "meetup" : 2,
        "user": 2,
        "response" : 'maybe'
    },
    {
        "id" : 3,
        "meetup" : 3,
        "user": 3,
        "response" : 'no'
    }
];

router.get('/', (req, res, next)=> {
 
    res.send(rsvps);
});

router.post('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'posting a RSVP'
    })
});

router.get('/:rsvpId', (req,res,next)=>{

    const rsvp = rsvps.find(c => c.id === parseInt(req.params.rsvpId));
    if(!rsvp) res.status(404).send('Not such Rsvp has ben planed');
    res.send(rsvp);
    
});

router.patch('/:rsvpId', (req,res,next)=>{
    res.status(200).json({
        message : 'udated rsvp'
    });
});

router.delete('/:rsvpId', (req,res,next)=>{
    res.status(200).json({
        message : 'deleted rsvp'
    });
});
module.exports = router;