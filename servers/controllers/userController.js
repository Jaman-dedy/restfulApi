const uuid = require("uuid");
const dateTime = require('date-time');

//using db
//const db = require('../dbparams/index')
const pool = require("../config/connection");
const current = dateTime();
module.exports = {
    createUser: (req, res) => {
        const
            { firstname, lastname, othername, email, phonenumber, username, isadmin } = req.body;

        pool.query('INSERT INTO users (firstname, lastname, othername, email, phonenumber, username, isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [firstname, lastname, othername, email, phonenumber, username, isadmin], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.status(201).json({
                    status: 201,
                    data: [req.body]
                });
            }
        });
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
            if(result.rows.length===0){
                return res.status(404).json({
                    status : 404,
                    error:"user not found"
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

        const  { firstname, lastname, othername, email, phonenumber, username, isadmin } = req.body;
        const current = dateTime();

        pool.query(
            'UPDATE users SET firstname = $1, lastname = $2, othername = $3,email = $4, phonenumber= $5, username= $6, registered= $7, isadmin= $8 WHERE id_user = $9',
            [firstname, lastname, othername, email, phonenumber, username,current, isadmin, userId],
            (err, result) => {
                if (err) {
                    throw err;
                }
                if(result.rows.length===0){
                    return res.status(404).json({
                        status : 404,
                        error:"user not found"
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
    getUsername:(req,res)=>{
        const username=req.params.username;
        pool.query("SELECT * FROM users WHERE username=$1",[username])
          .then(users=>{
            if (users.rows.length===0) {
              return res.status(404).json({error:"user not found"});
            }
            return res.json({users:users.rows});
          })
          .catch(error=>{
            console.log(error);
          })
    }

}

// Models
