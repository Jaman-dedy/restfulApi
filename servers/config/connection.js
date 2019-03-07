import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

//console.log(process.env);
let pool;

if(process.env.NODE_ENV==='DEV')
{
 
  pool = new Pool({
  connectionString: process.env.DATABASE_URL_DEV
});
}
else {
  class Seit {
    constructor(){
      this.createDb;
    }
    createDb(){
      const testdb = `CREATE DATABASE IF NOT EXISTS testdb  OWNER jaman;`;
      pool.query((testDb))
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })

    }
  }
  
  pool = new Pool({
    connectionString: process.env.DATABASE_URL_TEST
  });

}
console.log(process.env.NODE_ENV);
console.log("Connected to the db");

export default pool;
