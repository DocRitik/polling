const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose.connect(
    "mongodb://tinode:tinode@127.0.0.1:27017/tinode?authSource=admin",
    {
      dbName: "poll",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    },
    (err) =>
      err ? console.log(err) : console.log("Connected to `poll` database")
  );
};

module.exports = connectWithDb;

// create a votes table such that index is hash of hash(q) + hash(optionId)
