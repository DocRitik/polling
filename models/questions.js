const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  votes: { type: Number, default: 0 },
  label: { type: String, required: true },
});

const questionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    options: {
      type: [subSchema],
      required: true,
    },
    totalVotes: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

var questionsTable = mongoose.model("questions", questionsSchema);
module.exports = {
  createData: function (inputData) {
    return questionsTable.create(inputData);
    // data = new questionsTable(inputData);
    // data.save(function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   return callback(data);
    // });
  },

  getOneDataById: function (inputData) {
    return questionsTable.findById(inputData).exec();
  },

  getOneDataByQuestion: function (inputData) {
    return questionsTable.find({}).where("question").equals(inputData).exec();
  },

  updateVotes: function (questionId, optionId) {
    return questionsTable
      .findOneAndUpdate(
        { _id: questionId, "options._id": optionId },
        { $inc: { "options.$.votes": 1, totalVotes: 1 } },
        { new: true }
      )
      .exec();
  },

  getManyData: function () {
    return questionsTable.find({}).exec();
  },
};
