const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'All questions'
    })
});

router.post('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'posting a question'
    })
});

router.get('/:questionId', (req,res,next)=>{

    const id = req.params.questionId;
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

router.patch('/:questionId', (req,res,next)=>{
    res.status(200).json({
        message : 'udated question'
    });
});

router.delete('/:questionId', (req,res,next)=>{
    res.status(200).json({
        message : 'deleted question'
    });
});
module.exports = router;