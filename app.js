const express = require("express");
const mongoose = require("mongoose"); // importing mongoose
const dotenv = require("dotenv");
//middleware that can be used to enable CORS with various options.
const cors = require('cors')
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

//errorHandeling Middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500);
    res.send({
        error: {
            status: err.statusCode || 500,
            message: err,
        },
    });
});

//connecting to database
mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        app.listen(PORT);
        console.log("server started");
    })
    .catch((err) => {
        console.log(err);
    });
