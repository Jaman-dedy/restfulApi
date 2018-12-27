const express = require('express');
const router = express.Router();

const rsvp = [
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
 
    res.status(200).json({
        message : 'All RSP'
    })
});

router.post('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'posting a RSVP'
    })
});

router.get('/:rsvpId', (req,res,next)=>{

    const id = req.params.rsvpId;
    if(id==='special'){
        res.status(200).json({
            message : 'a specific question',
            id : id
        });
    } else {
        res.status(200).json({
            message : 'one question'
        });
    }
    
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