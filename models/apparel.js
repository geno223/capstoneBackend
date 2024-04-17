
const mongoose = require('mongoose');


const ApparelSchema = new mongoose.Schema({
    gender: String,
    tops: String,
    bottoms:String,
    image: String,
    price: Number,
});

const Apparel = mongoose.model('Apparel', ApparelSchema);

module.exports = Apparel;
