const uuid = require('uuid');   
const dateTime = require('date-time');
class User{
    //initialize the user data structure

    constructor(){
        this.users=[
            {
                id: 1,
                firstname: 'Emmanuel',
                lastname: 'Bush',
                othername: 'King',
                email: 'emabush@gmail',
                phoneNumber: '+243978318021',
                username: 'EmmaBush',
                registered: '2018-12-23',
                isAdmin: true
              },
              {
                id: 2,
                firstname: 'Gaëtan',
                lastname: 'Aruha',
                othername: 'Junior',
                email: 'gaetan@gmail',
                phoneNumber: '+243978318021',
                username: 'GaëtanArh',
                registered: '2018-12-23',
                isAdmin: false
              },
              {
                id: 3,
                firstname: 'Clara',
                lastname: 'Bush',
                othername: 'Queen',
                email: 'queenclara@gmail',
                phoneNumber: '+243978318021',
                username: 'QueenCla',
                registered: '2018-12-23',
                isAdmin: false
              }
        ];
       
    }
    createNewUser(data){
        const current = dateTime();
       const newUser = {
           id:uuid.v4(),
           firstname:data.firstname || '',
           lastname:data.lastname || '',
           othername: data.othername || '',
           email: data.email || '',
           phoneNumber: data.phoneNumber || '',
           username: data.username || '',
           registered: current,
           isAdmin: data.isAdmin || ''
       };
       this.users.push(newUser);
       return newUser;
    }
    findAllUsers(){
        return this.users;
    }
    findUserById(id){
       return this.users.find(user => user.id === id);
       
    }
    update(id, data){
        const user = this.findUserById(id);
        const index = this.users.indexOf(user);
        this.users[index].firstname = data['firstname'] || user.firstname;
        this.users[index].lastname = data['lastname'] || user.lastname;
        this.users[index].othername= data['othername'] || user.othername;
        this.users[index].email = data['email'] || user.email;
        this.users[index].phoneNumber = data['phoneNumber'] || user.phoneNumber;
        this.users[index].registered = data['registered'] || user.registered;
        this.users[index].isAdmin = data['isAdmin'] || user.isAdmin
        return this.users[index];
    }
    delete(id){
        const user = this.findUserById(id);
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        return user;
    }


}
//exporting the new user
module.exports= new User();
