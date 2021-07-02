import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const RealEstateListingSchema = new Schema({
    title: {
        type: String,
        required: 'Fill in the field'
    },
    address: {
        type: String,
        required: 'Enter an address'
    },
    price: {
        type: Number,
        required: 'Enter an email'
    },
    city: {
        type: String,
        required: 'Enter a City'
    },
    owner: {
        type: String,
        required: 'Enter a owner'
    },
    type: {
        type: String,
        required: 'Enter a Type'
        //residential, commercial, industrial
    }

})