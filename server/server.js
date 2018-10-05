// require('./config/config');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/index'));
app.use(express.static(path.resolve(__dirname, '../public/')));


mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.url_db,{useNewUrlParser: true}, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});