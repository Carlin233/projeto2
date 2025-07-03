const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT UNIQUE,
      senha TEXT NOT NULL,
      email TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS avisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mensagem TEXT NOT NULL,
      data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;