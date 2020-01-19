const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'brando',
  password: 'root',
  database: 'guestbook',
});

connection.connect(err => {
  if (err) {
    console.log(`error connecting ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;
