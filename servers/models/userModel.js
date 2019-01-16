class User{
    //initialize the user data structure

    constructor(){
        this.users=[];
       
    }
    createNewUser(data){
        const element=this.users.push(data);
        return element;
    }
    findAllUsers(){
        return this.users;
    }
    findUserById(id){
       return this.users.find(user=> user.id ===id);
    }


}
//exporting the new user
module.exports= new User();
