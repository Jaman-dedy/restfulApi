const uuid= require("uuid");

// Models

const User= require("../models/userModel");

module.exports= {
    create:(req, res)=>{
     const newUser={
     id:User.findAllUsers().length+1,
     firstname:req.body.firstname,
     lastname:req.body.lastname,
     othername:req.body.othername,
     email:req.body.email,
     phoneNumber:req.body.phoneNumber,
     username:req.body.username,
     registered:req.body.registered,
     isAdmin:req.body.isAdmin
     };
     User.createNewUser(newUser);
     return res.status(201).json({
         status : 201,
         data : [newUser]
     });
    },
    all:(req, res)=>{
        const users=User.findAllUsers();
        return res.status(200).json({
            status : 200,
            data : users
        });

    },
    userId:(req, res)=>{
        const user = User.findUserById(req.params.id);
        if(!user){
            return res.status(404).json({
                status : 200,
                message : 'Id not found'
            })
        }
        return res.status(200).json({
            status : 200,
            data : user
        })
    }


 
}
