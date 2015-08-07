var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var rubbishSchema = new Schema({
  content: [{type: String, required: true, maxlength: 400}]
})

var Rubbish = mongoose.model('Rubbish', rubbishSchema);

module.exports = Rubbish;

