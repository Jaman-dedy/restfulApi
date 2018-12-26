const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'All meetups'
    })
});

router.post('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'Creating a meetup'
    })
});

router.get('/:meetupId', (req,res,next)=>{

    const id = req.params.meetupId;
    if(id==='special'){
        res.status(200).json({
            message : 'You discovered the special ID',
            id : id
        });
    } else {
        res.status(200).json({
            message : 'one meetup'
        });
    }
    
});

router.patch('/:meetupId', (req,res,next)=>{
    res.status(200).json({
        message : 'udated meetup'
    });
});

router.delete('/:meetupId', (req,res,next)=>{
    res.status(200).json({
        message : 'deleted meetup'
    });
});
module.exports = router;