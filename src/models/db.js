const mysql = require("mysql2");

const pool=mysql.createPool({
    host: 'localhost',          
    user: 'root',               
    password: 'M1racle@123',    
    database: 'Realestate'      
  });
  console.log("connected");
  module.exports=pool.promise();