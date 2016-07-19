var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AreaSchema = new Schema({
    coordinates: Array,
    strategy: String,
    level: Number,
    type: String,
});

module.exports = mongoose.model('Area', AreaSchema);
