const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   numtel: { type: Number, required: true},
    mail: {  type: String, required: true },
    youtube: {  type: String, required: true },
    linkedin: {  type: String, required: true },
    facebook: {  type: String, required: true },


});

module.exports = mongoose.model('Contact', contactSchema);
