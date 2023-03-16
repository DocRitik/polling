const mongoose = require("mongoose");
const ai = require("../config/db");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
// userSchema.pre('save', function(next) {
//     console.log('in pre save')
//         // Only increment when the document is new
//     if (this.isNew) {
//         console.log('in new')
//         mongoose.model('user', userSchema).count().then(res => {
//             this._id = res; // Increment count
//             next();
//         });
//     } else {
//         next();
//     }
// });
var userTable = mongoose.model("user", userSchema);
module.exports = {
  addUser: function (inputData) {
    return userTable.create(inputData);
  },

  getUser: function (inputData) {
    return userTable.findOne({}).where("name").equals(inputData);
  },
};
