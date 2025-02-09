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

    db.run(`CREATE TABLE IF NOT EXISTS users_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        korcsoport TEXT NOT NULL,
        vegzettseg TEXT NOT NULL,
        regio TEXT NOT NULL,
        nem TEXT NOT NULL,
        anyagi_helyzet TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS survey_set (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        ceg_id INTEGER NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ceg_id) REFERENCES companies(id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        frm_option TEXT NOT NULL,
        type TEXT NOT NULL,
        order_by INTEGER NOT NULL,
        survey_id INTEGER NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (survey_id) REFERENCES survey_set(id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        survey_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        answer TEXT NOT NULL,
        question_id INTEGER NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (survey_id) REFERENCES survey_set(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    )`);
});

module.exports = db;