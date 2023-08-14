const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: { type: String, required: true},
    date:{type: String, require: true},
    localisation:{type: String, require: true},
    description: {  type: String, require: true },
    image: {type: String, require: true},
    userId: {  type: String },
});

module.exports = mongoose.model('Event', eventSchema);
