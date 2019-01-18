const uuid = require('uuid');   
const dateTime = require('date-time');
class Question{
    //initialize the user data structure

    constructor(){
        this.questions=[
            {
                id: 1,
                createdOn: '2018-12-30',
                createdBy: 1,
                meetup: 1,
                title: 'JS standardization',
                body: 'Why js syntaxes differ from a version to antoher?',
                upvote: 0,
                downvote : 0
              },
              {
                id: 2,
                createdOn: '2018-12-26',
                createdBy: 2,
                meetup: 2,
                title: 'Algrorithm complexity',
                body: 'How to set the order of functions?',
                upvote: 0,
                downvote : 0
              },
              {
                id: 3,
                createdOn: '2018-12-27',
                createdBy: 3,
                meetup: 3,
                title: 'Expert system',
                body: 'What expert system consists on?',
                upvote: 0,
                downvote : 0
              }
        ];
       
    }
    createNewQuestion(data){
     const current = dateTime();
       const newQuestion = {
           id:uuid.v4(),
           createdOn:current,
           createdBy:data.createdBy,
           meetup: data.meetup,
           title: data.title,
           body: data.title,
           upvote:data.upvote,
           downvote: data.downvote       
       };
       this.questions.push(newQuestion);
       return newQuestion;
    }
    findAllQuestions(){
        return this.questions;
    }
    findQuestionById(id){
       return this.questions.find(q => q.id === id);
       
    }
    update(id, data){
        const question = this.findQuestionById(id);
        const index = this.questions.indexOf(question);
        this.questions[index].createdOn = data['createdOn'] || question.createdOn ;
        this.questions[index].createdBy = data['createdBy'] || question.createdBy ;
        this.questions[index].meetup = data['meetup'] || question.meetup ;
        this.questions[index].title = data['title'] || question.title ;
        this.questions[index].body = data['body'] || question.body;
        this.questions[index].title = data['title'] || question.title ;
        
        
       
        return this.questions[index];
    }
    delete(id){
        const question = this.findQuestionById(id);
        const index = this.questions.indexOf(question);
        this.questions.splice(index, 1);
        return question;
    }


}
//exporting the new user
module.exports= new Question();
