//importing packages
const express = require("express");
const mongoose = require("mongoose"); // importing mongoose
const dotenv = require("dotenv");
//middleware that can be used to enable CORS with various options.
const cors = require('cors')
const bodyParser = require("body-parser");

//import routes
const authRoutes = require('./routes/auth');


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//calling route middleware
app.use(authRoutes);

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
