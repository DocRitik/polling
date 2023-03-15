const repo = require('../repository/pollRepo')

async function getPollCount() {
    let pollData = await repo.getPoll()
    let result = {
        1: { votes: 0, label: "C#" },
        2: { votes: 0, label: "PHP" },
        3: { votes: 0, label: "Python" },
        4: { votes: 0, label: "Go", }
    };
    pollData.forEach(element => {
        result[element._id]["votes"] = element.count

    });
    console.log("in get poll count ", result)
    return result
}

module.exports = { getPollCount }