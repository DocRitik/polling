const server = require('../server')
const Poll = require('../models/poll');
const insertModel = require('../models/user')

let count = 0
module.exports.CreatePoll = async(userId, optionId) => {
    console.log("user Input", userId, optionId)
    const poll = await Poll.create({
        user_id: userId,
        voted_option: optionId
    })
    console.log(poll)
}
module.exports.AddUser = async(firstName) => {
    const user = {
        name: firstName
    };
    insertModel.createData(user, function(data) {
        console.log(" record was created");
    });

    console.log(user)
}

// module.exports.CountVote = (optionId) => {
//     Poll.countDocuments({voted_option:optionId }, function (err, count) {
//        Count(count)
//       });
// };

// module.exports.CountVote = aync(optionId) => {
//     try {
//         const result = await Poll.find({ voted_option: optionId }).countDocuments()
//     }
//     Poll.estimatedDocumentCount({ voted_option: optionId })
// };
// // module.exports.Count = Count


module.exports.CountVotes = async(optionId) => {
    data = await Poll.aggregate().sortByCount("voted_option")
    return data
}

module.exports.getPoll = async() => {
    return await Poll.aggregate([{
        $group: {
            _id: '$voted_option',
            count: { $sum: 1 } // this means that the count will increment by 1
        }
    }], function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            return docs
        }
    });
}