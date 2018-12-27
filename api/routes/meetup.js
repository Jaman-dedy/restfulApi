const express = require('express');
const router = express.Router();

const meetup = [
{
  "id" : 1,
  "createdOn" : "2018/12/25",
  "location" : "telecom house",
  "images" : "upload/images/img.png",
  "topic" : "why javascript is the most use langage?",
  "happeningOn" : "2018/12/30",
  "Tags" : "Javascripts librairies, github statistics"
},
{
    "id" : 2,
    "createdOn" : "2018/12/23",
    "location" : "telecom house",
    "images" : "upload/images/img.png",
    "topic" : "Machine learnings",
    "happeningOn" : "2018/12/26",
    "Tags" : "Artificial intelligence (AI)"
  },
  {
    "id" : 3,
    "createdOn" : "2018/12/24",
    "location" : "IPRC Kichukiro",
    "images" : "upload/images/img.png",
    "topic" : "Big-O notation",
    "happeningOn" : "2018/12/27",
    "Tags" : "# Paul Bachmann, #Edmund Landau"
  },

];

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