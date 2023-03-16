const server = require("../server");
const Poll = require("../models/poll");
const insertModel = require("../models/user");
const qnaDB = require("../models/questions");

let count = 0;
module.exports.CreatePoll = async (data) => {
  console.log("user Input", data);
  const poll = await Poll.create({
    user_id: data.userId,
    voted_option: data.optionId,
  });
  console.log(poll);
  const resp = await qnaDB.updateVotes(data.questionId, data.optionId);
  return resp;
};

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

module.exports.CountVotes = async (optionId) => {
  data = await Poll.aggregate().sortByCount("voted_option");
  return data;
};

module.exports.getPoll = async () => {
  return await Poll.aggregate(
    [
      {
        $group: {
          _id: "$voted_option",
          count: { $sum: 1 }, // this means that the count will increment by 1
        },
      },
    ],
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        return docs;
      }
    }
  );
};
