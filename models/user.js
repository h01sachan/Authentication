var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        min : [6, 'Password should be more than 5 characters'],
    },
    isverified: {
        type: Boolean,
        default : false
    }
});

module.exports = mongoose.model("users", userSchema);