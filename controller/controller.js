const poll = require('../models/poll');
const repo = require('../repository/pollRepo')
const pollCount = require('./pollCountController')
module.exports = {}
module.exports.getPoll = async(req, res, next) => {

    let question = "What is your favorite language?"
        // let result = getPollCount();
    let result = await pollCount.getPollCount()
        // return result
    console.log("hit get poll api")
    return res.status(200).json({
        status: 200,
        message: "successfully fetched",
        data: {
            question: question,
            poll: result
        }
    });
};

async function getPollCount() {
    let pollData = await repo.getPoll()
    let result = {
        1: { votes: 0, label: "C#" },
        2: { votes: 0, label: "PHP" },
        3: { votes: 0, label: "Python" },
        4: { votes: 0, label: "Go", }
    };
    console.log(result[1]["votes"])
    pollData.forEach(element => {
        result[element._id]["votes"] = element.count

    });
    return result
}
module.exports.login = async(req, res, next) => {

    console.log("hit put login api", req.body.fullName)
    const user = await repo.AddUser(req.body.fullName);
    console.log('user', user)
    return res.status(200).json({
        status: 200,
        message: "successfully fetched",
        data: user
    });
};