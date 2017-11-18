var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	name: String,
	price: Number,
	image: String
});

module.exports = mongoose.model('Product', ProductSchema);