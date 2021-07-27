let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UsersSchema = new Schema({

    email:{type: String},

    password: {type: String},

    creation_date: {type: Date, default: Date.now},

    
});


module.exports = Users = mongoose.model('Users', UsersSchema);