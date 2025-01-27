const express = require('express');
const cors = require('cors');
const db = require('./data');
const { userValidation, companyValidation } = require('./validation');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.post('/api/users', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, email });
        });
});



app.post('/api/companies', (req, res) => {
    const { error } = companyValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { cegnev, telefon, ceg_email, jelszo, telepules, megye, 
            ceges_szamla, hitelkartya, adoszam, cegjegyzek, helyrajziszam } = req.body;
    
    db.run(`INSERT INTO companies (cegnev, telefon, ceg_email, jelszo, telepules, megye, 
            ceges_szamla, hitelkartya, adoszam, cegjegyzek, helyrajziszam) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [cegnev, telefon, ceg_email, jelszo, telepules, megye, 
         ceges_szamla, hitelkartya, adoszam, cegjegyzek, helyrajziszam],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        });
});


app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});