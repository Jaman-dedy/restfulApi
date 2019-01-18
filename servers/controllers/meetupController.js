const uuid = require("uuid");
const dateTime = require('date-time');
const validate = require('../helpers/utilities');

// Models

const MeetupModel = require("../models/meetupModel");
const RsvpModel = require("../models/rsvpModel")

module.exports = {
    createMeetup: (req, res) => {
      
        const meetupValidate = validate.meetupValidate;
        const { error } = meetupValidate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).json({
                status: 400,
                error: error.details[0].message
            })
        }else{
        const meetup = MeetupModel.createNewMeetup(req.body)
        return res.status(201).json({
            status: 201,
            data: [meetup]
        });
    }
    },
    createMeetupRsvp: (req, res) => {

        const rsvpValidate = validate.rsvpValidate;
        const { error } = rsvpValidate(req.body)
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message
            })
        }
        const rsvp = RsvpModel.createNewRsvp(req.body);
        return res.status(201).json({
            status: 201,
            data: [rsvp]
        });
    },
    getAllMeetup: (req, res) => {
        const meetups = MeetupModel.findAllmeetups();
        return res.status(200).json({
            status: 200,
            data: meetups
        });

    },
    getUpcoming: (req, res) => {
        const current = dateTime();
        const upcoming = [];
        meetupLegth = MeetupModel.meetups.length;

        for (let i = 0; i < meetupLegth; i++) {
            if (current < MeetupModel.meetups[i].happeningOn) {
                upcoming.push(MeetupModel.meetups[i]);
            }
        }

        return res.status(200).json({
            status: 200,
            data: upcoming
        });

    },
    getOneMeetup: (req, res) => {
        const meetupId = parseInt(req.params.id, 10);
        const meetup = MeetupModel.findMeetupById(meetupId);
        if (!meetup) {
            return res.status(404).json({
                status: 404,
                message: 'meetup not found'
            });
        }
        else {
            return res.status(200).json({
                status: 200,
                data: meetup
            })
        }
        
      
    },

}
