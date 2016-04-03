var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AreaSchema = new Schema({
    name: String,
    description: String,
    coordinates: Array,
});

module.exports = mongoose.model('Area', AreaSchema);
