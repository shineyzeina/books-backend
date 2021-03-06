const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Author = new Schema({
    first_name: { type: String, unique: true, required: true },
    last_name: { type: String, unique: false, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdDate: { type: Date, default: Date.now }
});

Author.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Author', Author);