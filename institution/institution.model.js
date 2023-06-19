const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Institution = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    authors:[{
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }]
});

Institution.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Institution', Institution);