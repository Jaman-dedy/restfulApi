import { Pool } from 'pg';
import ENV from 'dotenv';

ENV.config();

class Setup {
    constructor() {
        this.pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });

        this.pool.on('connect', () => {
            // console.log('connected...');
        });

        this.createTables();
    }
    createTables() {
        
        const users = `
        CREATE TABLE IF NOT EXISTS users
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
        );`;

        this.pool.query(users)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=> {
            console.log(err);
        });

        const meetup = `
        CREATE TABLE IF NOT EXISTS meetup
      (
          id_meetup serial PRIMARY KEY,
          createdon date NOT NULL DEFAULT CURRENT_DATE,
          location character varying(50),
          images character varying(2000)[],
          topic character varying(50),
          happeningon date,
          tags character varying(2000)[]
      );`;

        this.pool.query(meetup)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=> {
            console.log(err);
        });

        const question = `
        CREATE TABLE IF NOT EXISTS question (
            id_question serial PRIMARY KEY,
            createdon timestamp without time zone DEFAULT now(),
            id_user integer,
            id_meetup integer,
            title character varying(100) NOT NULL,
            body character varying(5000) NOT NULL
                   
          );`;

        this.pool.query(question)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=> {
            console.log(err);
        });

        const rsvp = `
        CREATE TABLE IF NOT EXISTS rsvp (
            id_rsvp serial PRIMARY KEY,  
            id_meetup integer,
            id_user integer,
            response character varying(6) NOT NULL       
          );`;

        this.pool.query(rsvp)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=> {
            console.log(err);
        });

        const comment = `
        CREATE TABLE IF NOT EXISTS comment (
            id_comment serial PRIMARY KEY,
            id_user integer,  
            id_question integer,        
            comment character varying(500) NOT NULL       
          );`;

        this.pool.query(comment)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=> {
            console.log(err);
        });
    }
}

export default new Setup();