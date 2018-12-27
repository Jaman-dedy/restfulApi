const express = require('express');
const router = express.Router();

const users = [
{
    "id" : 1,
    "firstname" : "Emmanuel",
    "lastname" : "Bush",
    "othername" : "King",
    "email" : "emabush@gmail",
    "phoneNumber" : "+243978318021",
    "username" : "EmmaBush",
    "registered" : "2018/12/23",
    "isAdmin" : true
   
},
{
    "id" : 2,
    "firstname" : "Gaëtan",
    "lastname" : "Aruha",
    "othername" : "Junior",
    "email" : "gaetan@gmail",
    "phoneNumber" : "+243978318021",
    "username" : "GaëtanArh",
    "registered" : "2018/12/23",
    "isAdmin" : false
   
},
{
    "id" : 3,
    "firstname" : "Clara",
    "lastname" : "Bush",
    "othername" : "Queen",
    "email" : "queenclara@gmail",
    "phoneNumber" : "+243978318021",
    "username" : "QueenCla",
    "registered" : "2018/12/23",
    "isAdmin" : false
   
}];

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