const mongoose = require('mongoose');

const lifeschema = new mongoose.Schema({
    provider:String,
    price:String,
    perks:String,
    details:String,
    coveragetill:String,
    onsurvival:String,
    ondeath:String,
})

module.exports =mongoose.model('life',lifeschema)

