const uuid = require('uuid');   
const dateTime = require('date-time');
class Meetup{
    //initialize the user data structure

    constructor(){
        this.meetups=[
            {
                id: 1,
                createdOn: '2018/12/25',
                location: 'telecom house',
                images: 'upload/images/img.png',
                topic: 'why javascript is the most use langage?',
                happeningOn: '2019-02-30',
                Tags: ['Javascripts', 'librairies', 'github statistics']
              },
              {
                id: 2,
                createdOn: '2018/12/23',
                location: 'telecom house',
                images: 'upload/images/img.png',
                topic: 'Machine learnings',
                happeningOn: '2019-01-29',
                Tags: ['Artificial intelligence (AI)']
              },
              {
                id: 3,
                createdOn: '2018/12/24',
                location: 'IPRC Kichukiro',
                images: 'upload/images/img.png',
                topic: 'Big-O notation',
                happeningOn: '2018-12-27',
                Tags: ['# Paul Bachmann', '#Edmund Landau']
              }
        ];
       
    }
    createNewMeetup(data){
     const current = dateTime();
       const newMeetup = {
           id:uuid.v4(),
           createdOn:current,
           location:data.location,
           images: data.images,
           topic: data.topic,
           happeningOn: data.happeningOn,
           tags:data.tags      
       };
       this.meetups.push(newMeetup);
       return newMeetup;
    }
    findAllmeetups(){
        return this.meetups;
    }
    findMeetupById(id){
       return this.meetups.find(q => q.id === id);
       
    }
    update(id, data){
        const meetup = this.findMeetupById(id);
        const index = this.meetups.indexOf(meetup);
        this.meetups[index].createdOn = data['createdOn'] || meetup.createdOn ;
        this.meetups[index].createdBy = data['createdBy'] || meetup.location ;
        this.meetups[index].meetup = data['meetup'] || meetup.images ;
        this.meetups[index].title = data['title'] || meetup.topic ;
        this.meetups[index].body = data['body'] || meetup.happeningOn;
        this.meetups[index].title = data['title'] || meetup.tags;       
        
       
        return this.meetups[index];
    }
    delete(id){
        const meetup = this.findMeetupById(id);
        const index = this.meetups.indexOf(meetup);
        this.meetups.splice(index, 1);
        return meetup;
    }


}
//exporting the new user
module.exports= new Meetup();
