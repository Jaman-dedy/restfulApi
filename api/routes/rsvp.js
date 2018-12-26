const express = require('express');
const router = express.Router();

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