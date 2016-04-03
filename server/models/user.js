var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    role: String,
    registrations: [{ type: Schema.Types.ObjectId, ref: 'GCM_Reg' }]
});

module.exports = mongoose.model('User', UserSchema);
