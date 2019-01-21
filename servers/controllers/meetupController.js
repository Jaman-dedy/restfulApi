const uuid = require("uuid");
const dateTime = require('date-time');
const validate = require('../helpers/utilities');

//using db
const pool = require('../config/connection');

// Models

const MeetupModel = require("../models/meetupModel");
const RsvpModel = require("../models/rsvpModel")

module.exports = {
    createMeetup: (req, res) => {
        const {location, images, topic, happeningon, tags } = req.body;

        pool.query('INSERT INTO meetup (location, images, topic, happeningon, tags) VALUES ($1,$2,$3,$4,$5)',
            [location, images, topic, happeningon, tags], (err, results) => {

                const meetupValidate = validate.meetupValidate;
                const { error } = meetupValidate(req.body)

                if (err) {
                    throw err;
                } else if (error) {
                    console.log(error)
                    return res.status(400).json({
                        status: 400,
                        error: error.details[0].message
                    })
                }
                else {
                    res.status(201).json({
                        status: 201,
                        data: [req.body]
                    });
                }
            });
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
        pool.query('SELECT * FROM meetup', (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                status: 200,
                data: result.rows
            });
        });

    },
    getUpcoming: (req, res) => {
        const current = dateTime();
        pool.query('SELECT * FROM meetup WHERE happeningon > $1', [current], (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                status: 200,
                data: result.rows
            });
        });

    },
    getOneMeetup: (req, res) => {
        const meetupId = parseInt(req.params.meetupId, 10);
        pool.query('SELECT * FROM meetup WHERE id_meetup = $1', [meetupId], (err, result) => {
            if (err) {
                throw err;
            }
            if(result.rows.length===0){
                return res.status(404).json({
                    status : 404,
                    error:"meetup not found"
                });
            }
            res.status(200).json({
                status: 200,
                data: result.rows
            });
        });


    },
    updateMeetup: (req, res) => {
        const meetupId = parseInt(req.params.meetupId, 10);

        const {location, images, topic, happeningon, tags } = req.body;
        const current = dateTime();

        pool.query(
            'UPDATE meetup SET location = $1, images = $2, topic = $3,happeningon = $4, tags= $5 WHERE id_meetup = $6',
            [location, images, topic, happeningon, tags, meetupId],
            (err, result) => {
                if (err) {
                    throw err;
                }
                if(result.rows.length===0){
                    return res.status(404).json({
                        status : 404,
                        error:"Meetup not found"
                    });
                }
                res.status(200).json({
                    status: 200,
                    data: [req.body]
                });
            }
        );
    },    
    deleteMeetup: (req, res) => {
        const meetupId = parseInt(req.params.meetupId, 10);

        pool.query('DELETE FROM meetup WHERE id_meetup = $1', [meetupId], (err, results) => {
            if (err) {
                throw err;
            }

            res.status(200).json({
                status: 200,
                data: `User deleted with ID: ${meetupId}`
            });
        });
    }

}
