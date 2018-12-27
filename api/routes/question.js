const express = require('express');
const router = express.Router();

questions = [
    {
        id : 1,
        createdOn : "2018/12/30",
        createdBy : 1,
        meetup : 1,
        title : "JS standardization",
        body : "Why js syntaxes differ from a version to antoher?",
        votes : 0
    },
    {
        id : 2,
        createdOn : "2018/12/26",
        createdBy : 2,
        meetup : 2,
        title : "Algrorithm complexity",
        body : "How to set the order of functions?",
        votes : 0
    },
    {
        id : 3,
        createdOn : "2018/12/27",
        createdBy : 3,
        meetup : 3,
        title : "Expert system",
        body : "What expert system consists on?",
        votes : 0
    },
];

router.get('/', (req, res, next)=> {
 
    res.send(questions);
});

router.post('/', (req, res, next)=> {

    
 
    const question = { 

      id: questions.length +1,
      user : req.body.user,
      meetup : req.body.meetup,
      title : req.body.title,
      body : req.body.body
    };
   questions.push(question);
   res.send(question);

});

router.get('/:questionId', (req,res,next)=>{

    const question = questions.find(c => c.id ===parseInt(req.params.questionId));
    if(!question) res.status(404).send('the question with the given id was not found');
    res.send(question);
});
router.patch('/:questionId/upvote', (req,res,next)=>{
    const question = questions.find(c => c.id ===parseInt(req.params.questionId));    
    if(!question) res.status(404).send('the meetup with the given Id was not found');
    let size = parseInt(req.params.questionId);
    size = size-1;
    let upvote = questions[size].votes;
    upvote ++;
    questions[size].votes = upvote;  
    res.send(question);  
});
router.patch('/:questionId/downvote', (req,res,next)=>{
    const question = questions.find(c => c.id ===parseInt(req.params.questionId));    
    if(!question) res.status(404).send('the meetup with the given Id was not found');
    let size = parseInt(req.params.questionId);
    size = size-1;
    let upvote = questions[size].votes;
    upvote --;
    questions[size].votes = upvote;  
    res.send(question);  
});

router.delete('/:questionId', (req,res,next)=>{
    res.status(200).json({
        message : 'deleted question'
    });
});
module.exports = router;