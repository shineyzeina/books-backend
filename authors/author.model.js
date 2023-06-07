const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true }
  });

const Author = new Schema({
    first_name: { type: String, unique: true, required: true },
    last_name: { type: String, unique: false, required: true },
    age : {type: String, unique: false, required: true},
    nationality : {type: String, unique: false, required: true},
    address: AddressSchema,
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