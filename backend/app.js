const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth');
const dbConnection = require('./config/database')
dbConnection()
    .then((res) => console.log("db running"))
    .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

app.listen(port);