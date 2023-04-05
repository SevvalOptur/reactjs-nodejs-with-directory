var mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.MYSQL_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

connection.connect(function(err) {
    if(err){
        console.error("error connecting:" + err.stack);
        return;
    }
    console.log("connected as id" +connection.threadId);

});

module.exports = connection;