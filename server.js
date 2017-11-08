const express = require('express');
const loging = require('morgan');

const app = express();

const port = process.env.PORT || 3000;

app.use(loging('dev'));

app.use(express.static(__dirname + '/app'));
console.log(__dirname + '/app');

app.get('/', (req, res) => {});


app.listen(port, () => {
    console.log(`server is up on port: ${port}`);
});