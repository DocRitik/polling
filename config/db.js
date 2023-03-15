const mongoose = require('mongoose');

const connectWithDb = () => {
    mongoose.connect(
        "mongodb://127.0.0.1:27017/", {
            dbName: "poll",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) =>
        err ? console.log(err) : console.log(
            "Connected to `poll` database")
    );

};

module.exports = connectWithDb