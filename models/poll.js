const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    voted_option: {
      type: String,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("poll", pollSchema);
