const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('survey_app.db');

db.serialize(() => {
    
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cegnev TEXT NOT NULL,
        telefon INTEGER NOT NULL,
        ceg_email TEXT UNIQUE NOT NULL,
        jelszo TEXT NOT NULL,
        telepules TEXT NOT NULL,
        megye TEXT NOT NULL,
        ceges_szamla INTEGER NOT NULL,
        hitelkartya INTEGER NOT NULL,
        adoszam INTEGER NOT NULL,
        cegjegyzek TEXT NOT NULL,
        helyrajziszam TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;