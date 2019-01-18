const uuid= require("uuid");

// Models

const RsvpModel= require("../models/rsvpModel");

module.exports= {
    createRsvp:(req, res)=>{
     if(!req.body.meetup && !req.body.user && !req.body.response)
     {
         return res.status(400).json({
             status : 400,
             message : 'All fields are required'
         })
     }
     const rsvp = RsvpModel.createNewRsvp(req.body)
     return res.status(201).json({
         status : 201,
         data : [rsvp]
     });
    },
    getAllRsvp:(req, res)=>{
        const rsvps=RsvpModel.findAllRsvps();
        return res.status(200).json({
            status : 200,
            data : rsvps
        });

    },
    getOneRsvp:(req, res)=>{
        const rsvpId=parseInt(req.params.id, 10);
        const rsvp = RsvpModel.findRsvpById(rsvpId);
      if(!rsvp){
            return res.status(404).json({
                status : 404,
                message : 'Rsvp not found'
            });
        }
        return res.status(200).json({
            status : 200,
            data : rsvp
        })
    },
    updateRsvp:(req, res)=>{
        const rsvpId = parseInt(req.params.id, 10);
        const rsvp = RsvpModel.findRsvpById(rsvpId);
        if(!rsvp){
            return res.status(404).json({
                status : 404,
                message : 'Rsvp not found'
            })
        }
        const rsvpUpdated = RsvpModel.update(rsvpId, req.body);
        return res.status(200).json({
            status: 200,
            data : rsvpUpdated
        })
    },
    deleteRsvp:(req, res)=>{
        const rsvpId = parseInt(req.params.id, 10);
        const rsvp = RsvpModel.findRsvpById(rsvpId);
       
        if(!rsvp){
            return res.status(404).json({
                status : 404,
                message : 'not found'
            })
        }
         const rsvpDeleted = RsvpModel.delete(rsvpId);
         return res.status(204).json({
             status : 204
         })
    }


 
}
