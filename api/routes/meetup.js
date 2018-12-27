const express = require('express');
const router = express.Router();

const meetups = [
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
 
    res.send(meetups);
});

router.post('/', (req, res, next)=> {
 
    res.status(200).json({
        message : 'Creating a meetup'
    })
});

router.get('/:meetupId', (req,res,next)=>{

    const meetup = meetups.find(c => c.id ===parseInt(req.params.meetupId));
    if(!meetup) res.status(404).send('the meetup with the given Id was not found');
    res.send(meetup);
    
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