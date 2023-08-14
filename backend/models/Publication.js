const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: {  type: String, required: true },
    image:{ type: String },
    detail:{type: String },
    

});

module.exports = mongoose.model('publication', publicationSchema);