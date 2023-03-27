var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pwebb"
});
connection.connect();

const db = {
    connection : connection
}

module.exports = db;