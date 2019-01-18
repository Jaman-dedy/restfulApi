const uuid = require('uuid');   
const dateTime = require('date-time');
class Rsvp{
    //initialize the user data structure

    constructor(){
        this.rsvps=[
            {
                id: 1,
                meetup: 1,
                user: 1,
                response: 'yes'
              },
              {
                id: 2,
                meetup: 2,
                user: 2,
                response: 'maybe'
              },
              {
                id: 3,
                meetup: 3,
                user: 3,
                response: 'no'
              }
        ];
       
    }
    createNewRsvp(data){
        
       const newRsvp = {
           id:uuid.v4(),
           meetup:data.meetup || '',
           user:data.user || '',
           response: data.response || ''          
       };
       this.rsvps.push(newRsvp);
       return newRsvp;
    }
    findAllRsvps(){
        return this.rsvps;
    }
    findRsvpById(id){
       return this.rsvps.find(rsvp => rsvp.id === id);
       
    }
    update(id, data){
        const rsvp = this.findRsvpById(id);
        const index = this.rsvps.indexOf(rsvp);
        this.rsvps[index].meetup = data['meetup'] || rsvp.meetup;
        this.rsvps[index].user = data['user'] || rsvp.user;
        this.rsvps[index].response= data['response'] || rsvp.response;
       
        return this.rsvps[index];
    }
    delete(id){
        const rsvp = this.findRsvpById(id);
        const index = this.rsvps.indexOf(rsvp);
        this.rsvps.splice(index, 1);
        return rsvp;
    }


}
//exporting the new user
module.exports= new Rsvp();
