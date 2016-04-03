var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var MarkerSchema = new Schema({
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    lat: Number,
    lng: Number,
});

module.exports = mongoose.model('Marker', MarkerSchema);  