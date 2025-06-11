const express = require('express');
const verifytoken = require('./middlwareformyapi/verifyplayerjwt');
const app = express();
const PORT = process.env.PORT||1000;

app.use(express.json());

app.use('/playerreg',require('./routesformyapi/playerreg'));

app.use('/playerauth',require('./routesformyapi/playerauth'));

app.use(verifytoken);
app.use('/clubplayers',require('./clubplayersapi/clubplayers'));
app.listen(PORT,()=>console.log('Server is running on '+PORT));