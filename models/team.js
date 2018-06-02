let mongoose = require('mongoose');

// team schema

let teamSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    coach:{
        type:String,
        required:true,
    },
    continent:{
        type:String,
        required:true,
    }
});

let Team = module.exports = mongoose.model('Team', teamSchema);