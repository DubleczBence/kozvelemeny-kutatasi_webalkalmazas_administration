const express = require('express');
const cors = require('cors');
const db = require('./data');
const { userValidation } = require('./validation');

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


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});