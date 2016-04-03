var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GCM_Reg = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    reg_id: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('GCM_Reg', GCM_Reg);
