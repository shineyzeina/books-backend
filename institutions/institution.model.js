const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true }
  });


const ContactSchema = new Schema ({
    email: {type: String, unique:true, required: true},
    phoneNumber: {type: String, unique:true, required: true},
    website: {type: String, unique:true, required: true, sparse:true}
})

const Institution = new Schema({

    name: { type: String, unique: true, required: true },
    dateOfCreation: {type: String, unique: false, required: true},
    contactInfo: ContactSchema,
    address: AddressSchema,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdDate: { type: Date, default: Date.now }
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