const uuid= require("uuid");

// Models

const UserModel= require("../models/userModel");

module.exports= {
    createUser:(req, res)=>{
     if(!req.body.firstname && !req.body.lastname && !req.body.othername && !req.body.email && req.body.phoneNumber && !req.body.username && req.body.registered && !req.body.isAdmin)
     {
         return res.status(400).json({
             status : 400,
             message : 'All fields are required'
         })
     }
     const user = UserModel.createNewUser(req.body)
     return res.status(201).json({
         status : 201,
         data : [user]
     });
    },
    getAllUser:(req, res)=>{
        const users=UserModel.findAllUsers();
        return res.status(200).json({
            status : 200,
            data : users
        });

    },
    getOneUser:(req, res)=>{
        const userId=parseInt(req.params.id, 10);
        const user = UserModel.findUserById(userId);
      if(!user){
            return res.status(404).json({
                status : 404,
                message : 'User not found'
            });
        }
        return res.status(200).json({
            status : 200,
            data : user
        })
    },
    updateUser:(req, res)=>{
        const userId = parseInt(req.params.id, 10);
        const user = UserModel.findUserById(userId);
        if(!user){
            return res.status(404).json({
                status : 404,
                message : 'user not found'
            })
        }
        const userUpdated = UserModel.update(userId, req.body);
        return res.status(200).json({
            status: 200,
            data : userUpdated
        })
    },
    deleteUser:(req, res)=>{
        const userId = parseInt(req.params.id, 10);
        const user = UserModel.findUserById(userId);
       
        if(!user){
            return res.status(404).json({
                status : 404,
                message : 'not found'
            })
        }
         const userDeleted = UserModel.delete(userId);
         return res.status(204).json({
             status : 204
         })
    }


 
}
