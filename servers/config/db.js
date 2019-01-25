const {Pool} = require('pg');
const dotenv= require('dotenv');

dotenv.config();

const pool = new Pool({
    connection: process.env.DATABASE_URL
});

pool.on('connect', ()=> {
    console.log('connected to the db');
});

const createTables = () => {
    const queryText = `
    CREATE TABLE public.users
    (
        id_user serial PRIMARY KEY,
        firstname character varying(50),
        lastname character varying(50),
        othername character varying(50),
        email character varying(50),
        phonenumber character varying(50),
        username character varying(50),
        registered date NOT NULL DEFAULT CURRENT_DATE,
        isadmin boolean NOT NULL DEFAULT false,
        password character varying(250)
    ); 
      CREATE TABLE public.meetup
      (
          id_meetup serial PRIMARY KEY,
          createdon date NOT NULL DEFAULT CURRENT_DATE,
          location character varying(50),
          images character varying(2000)[],
          topic character varying(50),
          happeningon date,
          tags character varying(2000)[]
      );
      CREATE TABLE IF NOT EXISTS question (
        id_question serial PRIMARY KEY,
        createdon timestamp without time zone DEFAULT now(),
        id_user integer,
        id_meetup integer,
        title character varying(100) NOT NULL,
        body character varying(5000) NOT NULL
               
      ); 

      CREATE TABLE IF NOT EXISTS rsvp (
        id_rsvp serial PRIMARY KEY,  
        id_meetup integer,
        id_user integer,
        response character varying(6) NOT NULL       
      );

      CREATE TABLE IF NOT EXISTS comment (
        id_comment serial PRIMARY KEY,
        id_user integer,  
        id_question integer,        
        comment character varying(500) NOT NULL       
      );

    `;

    pool.query(queryText)
    .then((res)=>{
        console.log(res);
        pool.end();
    })
    .catch((err)=> {
        console.log(err);
        pool.end();
    });
}
    
    // drop table
    const dropTables = ()=> {
        const queryText = 
        `
        DROP TABLE IF EXISTS user;
        DROP TABLE IF EXISTS meetup;
        DROP TABLE IF EXISTS question;
        DROP TABLE IF EXISTS rsvp;
        DROP TABLE IF EXISTS comment;        
        `
        pool.query(queryText)
        .then((res)=> {
            console.log(res);
            pool.end();
        })
        .catch((err)=>{
            console.log(err);
            pool.end();
        })
    }

pool.on('remove', ()=> {
    console.log('client removed');
    process.exit(0);
});
module.exports = {
    createTables,
    dropTables
};

require('make-runnable');