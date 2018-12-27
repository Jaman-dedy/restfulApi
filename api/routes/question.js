const express = require('express');
const router = express.Router();

question = [
    {
        "id" : 1,
        "createdOn" : "2018/12/30",
        "createdBy" : 1,
        "meetup" : 1,
        "title" : "JS standardization",
        "body" : "Why js syntaxes differ from a version to antoher?",
        "votes" : 1
    },
    {
        "id" : 2,
        "createdOn" : "2018/12/26",
        "createdBy" : 2,
        "meetup" : 2,
        "title" : "Algrorithm complexity",
        "body" : "How to set the order of functions?",
        "votes" : 1
    },
    {
        "id" : 3,
        "createdOn" : "2018/12/27",
        "createdBy" : 3,
        "meetup" : 3,
        "title" : "Expert system",
        "body" : "What expert system consists on?",
        "votes" : 1
    },
];

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