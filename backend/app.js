const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

const dbConnection = require('./config/database');

dbConnection()
    .then(() => console.log('DB connected successfully'))
    .catch((err) => console.error(`DB connection error: ${err.message}`));

app.use(express.json());
app.use(cookieParser());

const userRouter = require('./routes/userRoutes');


app.use('/', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
