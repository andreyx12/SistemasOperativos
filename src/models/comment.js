var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true
    },
    createdDate: { 
        type: Date, 
        required: true 
    },
    productId: { 
        type: Schema.ObjectId, 
        ref: "Product"
    }
});

module.exports = mongoose.model('Comment', CommentSchema);