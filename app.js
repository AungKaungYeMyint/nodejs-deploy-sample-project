const express = require('express');

const app = express();

const sql = require('./utilities/mysql');

const fruitsRoute = require('./routes/fruits');
const apiRoute = require('./routes/api');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + "/static"));
app.use('/fruits', fruitsRoute);
app.use('/api/',apiRoute);

app.get("/", (req, res) => {
    res.render('home');
})

app.listen(3000);