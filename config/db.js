const mongoose = require('mongoose');

const connectWithDb = () => {
    mongoose.connect(
        process.env.dbConn, {
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