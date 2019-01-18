const uuid= require("uuid");
const validate = require('../helpers/utilities');
// Models

const QuestionModel= require("../models/questionModel");

module.exports= {
    createQuestion:(req, res)=>{
    /* if(!req.body.createdBy && !req.body.meetup && !req.body.title && !req.body.body)
     {
         return res.status(400).json({
             status : 400,
             message : 'All fields are required'
         })
     }*/
     const questionValidate = validate.questionValidate;
    const {error}= questionValidate(req.body) 
    if(error){
        return res.status(400).json({
            status : 400,
            error : error.details[0].message
        })
    }
     const question = QuestionModel.createNewQuestion(req.body)
     return res.status(201).json({
         status : 201,
         data : [question]
     });
    },
    getAllQuestion:(req, res)=>{
        const questions=QuestionModel.findAllQuestions();
        return res.status(200).json({
            status : 200,
            data : questions
        });

    },
    getOneQuestion:(req, res)=>{
        const questionId=parseInt(req.params.id, 10);
        const question = QuestionModel.findQuestionById(questionId);
      if(!question){
            return res.status(404).json({
                status : 404,
                message : 'question not found'
            });
        }
        return res.status(200).json({
            status : 200,
            data : question
        })
    },
    upvoteQuestion:(req, res)=>{
    const questionId = parseInt(req.params.id, 10);
    const question = QuestionModel.findQuestionById(questionId);
    if(!question){
        return res.status(404).json({
            status : 404,
            message : 'question not found'
        })
    }
    let size = questionId;
    size -=1;
    let upvote= QuestionModel.questions[size].upvote
    upvote++;
    QuestionModel.questions[size].upvote= upvote;
    res.status(200).json({
        status: 200,
        data : question
    });
    
    },
    downvoteQuestion:(req, res)=>{
        const questionId = parseInt(req.params.id, 10);
        const question = QuestionModel.findQuestionById(questionId);
        if(!question){
            return res.status(404).json({
                status : 404,
                message : 'question not found'
            })
        }
        let size = questionId;
        size -=1;
        let downvote= QuestionModel.questions[size].downvote;
        downvote++;
        QuestionModel.questions[size].downvote= downvote;
        res.status(200).json({
            status: 200,
            data : question
        });
        
        },
    updateQuestion:(req, res)=>{
        const questionId = parseInt(req.params.id, 10);
        const question = QuestionModel.findQuestionById(questionId);
        if(!question){
            return res.status(404).json({
                status : 404,
                message : 'question not found'
            })
        }
        const questionUpdated = QuestionModel.update(questionId, req.body);
        return res.status(200).json({
            status: 200,
            data : questionUpdated
        })
    },
  
 
}
