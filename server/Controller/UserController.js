const { validationResult } = require('express-validator');
const User = require('../models/UserModel');
const { ReturnBookController } = require('./BookController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { measureMemory } = require('vm');

exports.signupController = async(req,res) =>{
    try {
        // const error = validationResult(req);
        // if(!error.isEmpty()){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Validation error",
        //         error: error.array()
        //     });
        // }
        const user = await User.findOne({email:req.body.email})
        console.log(user)
        if(!user){

            const saltRounds = 20;
            // const salt = (await bcrypt.genSalt(saltRounds)).toString();
            // const pass = (await bcrypt.hash(req.body.password, salt)).toString()

            const salt = await bcrypt.genSalt(saltRounds);
            const pass = await bcrypt.hash(req.body.password, salt);

            const newUser = await User.create({
                password:pass,
                name:req.body.name,
                email:req.body.email
            })

            if(!newUser){
                return res.status(400).json({
                    success:false,
                    message:"Failed to create user"
                })
            }
            console.log("newUser"+newUser)
            
            const data = {
                user:{
                    userId:newUser._id // id of newly created user
                }
            }
            
            const authToken = jwt.sign(data, process.env.JWT_SECRETE_KEY)
            return res.status(201).json({ 
                success:true,
                message:"Sign-in successful!", 
                authToken,
            });
        }
        return res.status(400).json({
            success:false,
            message:"User already exists",
        })

    } catch (error) {
        console.log(error);
      if (!res.headersSent) {
        status = false;
        return res.status(500).json({ 
            success:false,
            message:"Internal server error",
            error: error 
        });
      }
    }
}

exports.loginController = async(req,res) =>{
    try {
        const {
            email,
            password
        } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'all fields are required'
            })
        }

        const existingUser = await User.findOne({email:email});
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:'user does not exist'
            })
        }
        console.log(existingUser)

        const passMatch = await bcrypt.compare(password,existingUser.password)

        if(!passMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const data = {
            user:{
                userId:existingUser._id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRETE_KEY);
        return res.status(200).json({
            success:true,
            message:'login successful',
            authToken
        })

        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error
        })
    }
}