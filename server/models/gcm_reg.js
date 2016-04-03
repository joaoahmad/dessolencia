var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GCM_Reg = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    reg_id: String,
});

module.exports = mongoose.model('GCM_Reg', GCM_Reg);
