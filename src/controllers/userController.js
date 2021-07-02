// User Signup, this endpoint will accept a user object (username, password, email, Full name, address, phone number). Passwords are not to be stored in plain text. The endpoint should ensure that all fields are supplied if 
//not it should return an error code 400. Other expected error codes can be considered in other cases
import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User',UserSchema);

export const userSignUp = (req,res) => {
    let newUser = new User(req.body);

    newUser.save((err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
}
export const getUsers = (req, res) => {
    
    User.find({}, (err, user) =>{
        if(err) { 
            res.send(err);
        }
        res.json(user);
    });
}

export const getUserByUserName = (req, res) => {
    
    User.findOne({userName: req.params.name}, (err, user) =>{
        if(err) { 
            res.send(err);
        }
        res.json(user);
    });
}

export const updateProfile = (req,res) => {
    User.findOneAndUpdate({userName: req.params.name}, req.body, {new:true, useFindAndModify: false}, (err,user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
}

export const deleteUser = (req,res) => {
    User.remove({userName: req.params.name}, (err,user) =>{
        if(err) {
            res.send(err);
        }
        res.json({message: 'successfully deleted User'});
    });

}