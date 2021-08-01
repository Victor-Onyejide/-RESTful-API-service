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

export const login = (req,res) => {
    if (!req.body.userName || !req.body.password) {
        return res.status(400).json({
            'msg': 'You need to fil in username and password'
        });

    }

    User.findOne ({
        userName : req.body.userName
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: err,
                code: 400,
                status: false
            });
        } 

        if (!user) {
            return res.status(404).json({
                message: 'The user does not exist',
                code: 404,
                status: false
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err){
                return res.status(200).json({
                    message: 'User logged in successfully!',
                    status: true,
                    data: user,
                    code: 200
                });
            }
            if(!isMatch){
                return res.status(404).json({
                    message: 'Invalid username and password!',
                    status: false,
                    code: 404
                })
            } else {
                return res.status(400).json({
                    message: 'Something went wrong',
                    code: 400,
                    status: false
                });
            }
        })
    });
}
 export const changePassword = (req,res) => {
     if (!req.body.old_password) {
         return res.status(400).json({
             message: 'You need to fill in the required fields'
         });
     }

     if (req.params.userName) {
         User.findById(req.params.userName,(err, user) => {
             
            user.comparePassword(req.body.old_password, (err, isMatch) => {
                if(isMatch && !err) {
                    if (req.body.new_password !== req.body.confirm_password){
                        return res.status(400).json({
                            message: 'Passwords dont\' match',
                            status: false,
                            code:400
                        })
                    }

                    user.password = req.body.new_password;
                    // user.confirm_password = req.body.confirm_password;
                    user.save((err, updateProfile) =>{
                        if (err) {
                            return res.status(500).json({
                                status: false,
                                message: 'Unable to update password',
                                code: 500
                            });
                        }
                        if (updateProfile){
                            return res.status(200).json ({
                                status:true,
                                message: 'Password successfully changed',
                                data: updateProfile,
                                code: 200

                            })

                        }
                    });
                }
                if (!isMatch) {
                    return res.status(404).json({
                        message: 'Invalid password',
                        status: false,
                        code: 404
                    })
                }

                if (err) {
                    return res.status(400).json({
                        message:err.message,
                        status: false,
                        code: 400
                    })
                }
            })

         })
     }
 };