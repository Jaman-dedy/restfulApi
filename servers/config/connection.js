const {Pool}=require("pg");

const pool=new Pool({
    connectionString:"postgresql://jaman:123@localhost:5432/questioner"
});

module.exports=pool;