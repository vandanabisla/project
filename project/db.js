const mysql = require('mysql');

const db = new mysql.Database(':memory:', (err) => {
  if (err) {
    console.error('Error connecting to database', err);
  } else {
    console.log('Connected to mysql database');
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )
    `);
  }
});

module.exports = db;
