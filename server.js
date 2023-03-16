// Import dependencies
const connectWithDb = require("./config/db");
const express = require("express");
const app = express();
const http = require("http");
const Poll = require("./models/poll");
const repo = require("./repository/pollRepo");
const routes = require("./routes/routes");
const morgan = require("morgan");
require('dotenv').config();
const pollCount = require("./controller/pollCountController");
const cors = require("cors");
// connect with database
connectWithDb();
var bodyParser = require("body-parser");

// If you change this remember to change it on the client side as well
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
// Host the front end
// app.use(express.static("client"));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "origin, X-Requested-With,Content-Type,Accept, Authorization"
//   );
//   next();
// });

// Start the server and initialize socket.io
// const server = app.listen(port, () =>
//   console.log(`Listening at http://localhost:${port}`)
// );
const server = http.Server(app);
server.listen(process.env.PORT);
const io = require("socket.io")(server, { cors: "*" });
app.use(express.json());
app.disable("etag");
app.use("/api", routes);

function mongooseErrorHandler(err, req, res, next) {
    if (err.name === "ValidationError") {
        let errors = {};
        console.log(err);
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });

        return res.status(400).send(errors);
    }
    return res.status(500).send("Something went wrong");
}

app.use(mongooseErrorHandler);

// const voteCounts = {
//     "1": { votes: 0, label: "C#"},
//     "2": { votes: 0, label: "PHP"},
//     "3": { votes: 0, label: "Python"},
//     "4": { votes: 0, label: "Go", }
// };

// let one = 0
// let two = 0
// let three = 0
// let four=0
//count the no. of votes for corresponding option

// one = repo.CountVote(1)

// two = repo.CountVote(2)

//voteCounts
// Initialize candidates
//  const voteCount = {
//   "1": { votes:one, label: "C#"},
//   "2": { votes: two, label: "PHP"},
//   "3": { votes: three, label: "Python"},
//   "4": { votes: four, label: "Go", }
//  }
// console.log(voteCount)

// On new client connection
io.on("connection", (socket) => {
    console.log("total users", io.engine.clientsCount);

    // On new vote
    socket.on("vote", async(data) => {
        console.log("i got votes", data);
        //Save the current vote corresponding to the userId
        const res = await repo.CreatePoll(data);
        // Tell everybody else about the new vote
        // const res = await pollCount.getPollCount();
        console.log(res);
        io.emit("update", res);
    });
});