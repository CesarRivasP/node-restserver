//importancion que cargue una serie de rutas se logra mediante un archivo como este
const express = require('express');

const app = express();


app.use( require('./user'));
app.use( require('./login'));

module.exports = app;
