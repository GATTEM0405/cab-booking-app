const mongoose = require('mongoose');

const bikeschema = new mongoose.Schema({
    provider:String,
    idv:String,
    claim:String,
    price:String,
    perks:String,
    details:String,
})

module.exports =mongoose.model('bike',bikeschema)

