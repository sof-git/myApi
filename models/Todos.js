let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TodosSchema = new Schema({

    name: {type: String},

    description: {type: String},

    difficulty:{type: Number},

    creation_date: {type: Date, default: Date.now},

    priority: {type: String}

});


module.exports = Todos = mongoose.model('Todos', TodosSchema);
