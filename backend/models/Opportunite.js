const mongoose = require('mongoose');

const opportuniteSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: {  type: String, required: true },
    imageUrl:{ type: String },
    pdfUrl:{type: String},
    lienUrl: {type: String},

});

module.exports = mongoose.model('Opportunite', opportuniteSchema);