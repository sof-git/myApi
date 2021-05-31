let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UsersSchema = new Schema({

    firstname: {type: String},

    lastname: {type: String},

    email:{type: String},

    password: {type: String},

    birthdate: {type: Date},

    creation_date: {type: Date, default: Date.now},

    
});


module.exports = Users = mongoose.model('Users', UsersSchema);