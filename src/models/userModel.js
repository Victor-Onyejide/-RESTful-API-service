import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// username, password, email, Full name, address, phone number


export const UserSchema = new Schema({

    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String,
        required: 'Enter an email'
    },
    userName: {
        type: String,
        required: 'Enter a user name'
    },
    address: {
        type: String,
        required: 'Enter an address'
    },
    phoneNumber: {
        type: Number,
        required: 'Enter a phonenumber'
    },
    password: { 
        type: String,
        required: 'Enter Password'

    }


})