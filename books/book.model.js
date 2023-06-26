const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ISBN: { type: String, unique: true, required: true },
    name: { type: String, unique: false, required: true },
    rating: { type: Number, unique: false, required: true },
    author:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    category : {
        type : String,
        unique : false,
        required : true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdDate: { type: Date, default: Date.now },
    favorites: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    category: {
        type: String,
        required: true
    }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Book', schema);