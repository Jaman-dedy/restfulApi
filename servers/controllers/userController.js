const uuid = require("uuid");
const dateTime = require('date-time');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Keys=require("../config/keys");

//using db
//const db = require('../dbparams/index')
const pool = require("../config/connection");
const current = dateTime();
module.exports = {

    // Format of token
    // Autorization: Bearer <token>

    verifyToken: (req,res, next) => {
        // get auth header value
        try{
            const token = req.headers.authorization;
           const someone=token.split(" ");
            const real=someone[1];
            const decoded=jwt.verify(real,Keys.secret);
            req.user=decoded;
            next();
        }
        catch(error){
            return res.status(401).json({error:"Auth failed."})
        }
       
    },

    login: (req, res) => {
        const { username } = req.body;

        pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
            if (err) {
                throw err;
            }
            if (result.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: "user not found"
                });
            }
            const userlog ={
                username:result.rows[0].username,
                email:result.rows[0].email,
                id:result.rows[0].id_user,
                firstname:result.rows[0].firstname,
                lastname:result.rows[0].lastname,
                isadmin:result.rows[0].isadmin
            };

            jwt.sign(userlog, Keys.secret, {expiresIn:3600},(err, token) => {
                if(err){
                    console.log(err);
                }
                res.status(200).json({
                    status: 200,
                    user:result.rows,
                    token:token
                })
            });

        });

    },
    createUser: (req, res) => {

        jwt.verify(req.token, 'emmanuel', (err, authData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    errof: Forbidden
                })

            } else {
                const
                    { firstname, lastname, othername, email, phonenumber, username, isadmin } = req.body;
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.log(err);
                    }
                    bcrypt.hash(req.body.password, salt, (er, hash) => {
                        if (er) {
                            console.log(er);
                        }
                        pool.query('INSERT INTO users (firstname, lastname, othername, email, phonenumber, username, isadmin,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
                            [firstname, lastname, othername, email, phonenumber, username, isadmin, hash], (err, results) => {
                                if (err) {
                                    throw err;
                                } else {
                                    res.status(201).json({
                                        status: 201,
                                        data: results.rows
                                    });
                                }
                            });
                            authData

                    })
                })

            }

        })


        /**/
    },

    getAllUser: (req, res) => {

        pool.query('SELECT * FROM users', (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                status: 200,
                data: result.rows
            });
        });

    },
    getOneUser: (req, res) => {
        const userId = parseInt(req.params.userId, 10);
        pool.query('SELECT * FROM users WHERE id_user = $1', [userId], (err, result) => {
            if (err) {
                throw err;
            }
            if (result.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: "user not found"
                });
            }
            res.status(200).json({
                status: 200,
                data: result.rows
            });
        });
    },
    updateUser: (req, res) => {
        const userId = parseInt(req.params.userId, 10);

        const { firstname, lastname, othername, email, phonenumber, username, isadmin } = req.body;
        const current = dateTime();

        pool.query(
            'UPDATE users SET firstname = $1, lastname = $2, othername = $3,email = $4, phonenumber= $5, username= $6, registered= $7, isadmin= $8 WHERE id_user = $9',
            [firstname, lastname, othername, email, phonenumber, username, current, isadmin, userId],
            (err, result) => {
                if (err) {
                    throw err;
                }
                if (result.rows.length === 0) {
                    return res.status(404).json({
                        status: 404,
                        error: "user not found"
                    });
                }
                res.status(200).json({
                    status: 200,
                    data: [req.body]
                });
            }
        );
    },
    deleteUser: (req, res) => {
        const userId = parseInt(req.params.userId, 10);

        pool.query('DELETE FROM users WHERE id_user = $1', [userId], (err, results) => {
            if (err) {
                throw err;
            }

            res.status(200).json({
                status: 200,
                data: `User deleted with ID: ${userId}`
            });
        });
    },
    getUsername: (req, res) => {
        const username = req.params.username;
        pool.query("SELECT * FROM users WHERE username=$1", [username])
            .then(users => {
                if (users.rows.length === 0) {
                    return res.status(404).json({ error: "user not found" });
                }
                return res.json({ users: users.rows });
            })
            .catch(error => {
                console.log(error);
            })
    }

}

// Models
