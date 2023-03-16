const poll = require("../models/poll");
const repo = require("../repository/pollRepo");
const pollCount = require("./pollCountController");
const qna = require("./../data/data");
const QnADB = require("./../models/questions");
const UserDB = require("./../models/user");
module.exports = {};
module.exports.getPoll = async (req, res, next) => {
  console.log("holla");
  let question = "What is your favorite language?";
  // let result = getPollCount();
  let result = await pollCount.getPollCount();
  // return result
  console.log("hit get poll api");
  return res.status(200).json({
    status: 200,
    message: "successfully fetched",
    data: {
      question: question,
      poll: result,
    },
  });
};

module.exports.getQnO = async (req, res, next) => {
  const data = await QnADB.getOneData(req.params.id);
  return res.status(201).json({
    status: 200,
    message: "successfully fetched",
    data,
  });
};

module.exports.getAllQnO = async (req, res, next) => {
  data = await QnADB.getManyData();

  return res.status(201).json({
    status: 200,
    message: "successfully fetched",
    data,
  });
};

module.exports.createQnO = async (req, res, next) => {
  // try {
  const qno = await QnADB.getOneDataByQuestion(req.body.question);
  if (qno.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "question already exists",
    });
  }
  try {
    const optionsArray = req.body.options.map((data) => {
      return { label: data };
    });
    const dbData = { question: req.body.question, options: optionsArray };
    await QnADB.createData(dbData);
    return res.status(201).json({
      status: 201,
      message: "successfully created",
    });
  } catch (error) {
    next(error);
  }
};

async function getPollCount() {
  let pollData = await repo.getPoll();
  let result = {
    1: { votes: 0, label: "C#" },
    2: { votes: 0, label: "PHP" },
    3: { votes: 0, label: "Python" },
    4: { votes: 0, label: "Go" },
  };
  console.log(result[1]["votes"]);
  pollData.forEach((element) => {
    result[element._id]["votes"] = element.count;
  });
  return result;
}
module.exports.login = async (req, res, next) => {
  try {
    var user = await UserDB.getUser(req.body.name);
    if (user) {
      return res.status(200).json({
        status: 200,
        message: "user already exists",
        data: user,
      });
    }
    user = await UserDB.addUser(req.body);
    return res.status(201).json({
      status: 201,
      message: "successfully created",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
