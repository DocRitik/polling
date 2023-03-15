const mongoose = require('mongoose')
const ai = require('../config/db');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "default",
    }
});
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
var userTable = mongoose.model('user', userSchema);
module.exports = {
    createData: function(inputData, callback) {

        userData = new userTable(inputData);
        userData.save(function(err, data) {
            if (err) console.log(err);
            return callback(data);
        });

    }
}