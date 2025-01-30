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

app.get('/api/companies', (req, res) => {
    db.all('SELECT * FROM companies', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


app.put('/api/users/:id', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;
    db.run(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, password, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található." });
            res.json({ id: req.params.id, name, email });
        }
    );
});


app.put('/api/companies/:id', (req, res) => {
    const { error } = companyValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { cegnev, telefon, ceg_email, jelszo, telepules, megye, 
            ceges_szamla, hitelkartya, adoszam, cegjegyzek, helyrajziszam } = req.body;
    
    db.run(
        `UPDATE companies SET cegnev = ?, telefon = ?, ceg_email = ?, jelszo = ?, 
         telepules = ?, megye = ?, ceges_szamla = ?, hitelkartya = ?, 
         adoszam = ?, cegjegyzek = ?, helyrajziszam = ? WHERE id = ?`,
        [cegnev, telefon, ceg_email, jelszo, telepules, megye, 
         ceges_szamla, hitelkartya, adoszam, cegjegyzek, helyrajziszam, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A cég nem található" });
            res.json({ id: req.params.id, ...req.body });
        }
    );
});


app.delete('/api/users/:id', (req, res) => {
    db.run('DELETE FROM users WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található" });
        res.json({ message: "A felhasználó törölve lett" });
    });
});


app.delete('/api/companies/:id', (req, res) => {
    db.run('DELETE FROM companies WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A cég nem található" });
        res.json({ message: "A cég törölve lett" });
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});