const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'Handling get request to/user'
    })
});

router.post('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'Handling post request to/user'
    })
});

router.get('/:userId', (req,res,next)=>{

    const id = req.params.userId;
    if(id==='special'){
        res.status(200).json({
            message : 'You discovered the special ID',
            id : id
        });
    } else {
        res.status(200).json({
            message : 'you passed an ID'
        });
    }
    
});

router.patch('/:userId', (req,res,next)=>{
    res.status(200).json({
        message : 'udated user'
    });
});

router.delete('/:userId', (req,res,next)=>{
    res.status(200).json({
        message : 'deleted user'
    });
});
module.exports = router;