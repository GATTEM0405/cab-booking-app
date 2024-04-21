const mongoose = require('mongoose');

const healthschema = new mongoose.Schema({
    provider:String,
    hospitals:String,
    cover:String,
    validity:String,
    price:String,
    perks:String,
    details:String,
})

module.exports =mongoose.model('health',healthschema)

