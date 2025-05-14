const express = require('express');
const app = express();
const port = 3002;

app.get('/products', (req, res) => res.send('List of products'));

app.listen(port, () => console.log(`Products API listening on port ${port}`));