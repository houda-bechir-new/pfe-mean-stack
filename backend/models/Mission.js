const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: {  type: String },
});

module.exports = mongoose.model('Mission', missionSchema);
