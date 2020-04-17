var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: Boolean, 
        required: true
    },
    expirationDate: { 
        type: Date, 
        required: true 
    },
    imagePath: { 
        type: String, 
        required: true 
    },
    views: { 
        type: Number
    },
    amount: { 
        type: mongoose.Types.Decimal128, 
        required: true 
    }
});

module.exports = mongoose.model('Product', ProductSchema); 