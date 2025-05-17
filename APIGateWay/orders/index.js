const express = require('express');
const app = express();
const port = 3001;

app.get('/orders', (req, res) => res.send('List of orders'));

app.listen(port, () => console.log(`Orders API listening on port ${port}`));