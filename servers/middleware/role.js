exports.role=(req,res,next)=>{
    if(req.user.isadmin===true){
        next();
    }
    else{
        return res.status(400).json({error:"permission denied"});
    }
}