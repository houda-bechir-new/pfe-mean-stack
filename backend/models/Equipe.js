const mongoose = require('mongoose');

const equipeSchema = mongoose.Schema({
    nom: { type: String, required: true},
    prenom: {  type: String, required: true },
    occupation: {  type: String, required: true },
    etablissement: {  type: String, required: true },
    image: {type: String},

});

module.exports = mongoose.model('Equipe', equipeSchema);