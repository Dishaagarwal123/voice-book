const express = require("express");
const router = express.Router();
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");


router.post("/signup", async(req,res)=>{
    try{
        const {username,password,email} = req.body;

        if(username.length<4){
            return res.status(400).json({message:"username length should be greater than 3"});
        }
        const existingUsername = await user.findOne({username:username});
        if(existingUsername){
            return res.status(400).json({message:"username already exists!"});
        }
        const existingEmail = await user.findOne({email:email});
        if(existingEmail){
            return res.status(400).json({message:"Email already exists!"});
        }
        if(password.length<=5){
            return res.status(400).json({message:"password length should be greater than 5"});
        }
        const hashPass = await bcrypt.hash(password,10);
        const newUser = new user({username:username,email:email,password:hashPass});
        await newUser.save();
        return res.status(200).json({message:"SignUp successful!"})
            }
    
    catch(error){
        res.status(500).json({message:"internal server error"});
    }
});

router.post("/login", async(req,res)=>{
    try{
        const {username,password} = req.body;
        const existingUser = await user.findOne({username});
        if(!existingUser){
            res.status(400).json({message:"Invalid credentials"});
        }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims = [
                    {name: existingUser.username},
                
                ]
                const token = jwt.sign({authClaims},"bookStore123",{expiresIn: "30d",});

                res.status(200).json({
                    id: existingUser._id,
                    token: token,
                });
            }
            else{
                res.status(400).json({message:"Invalid credentials"});
            }
        });
        }
    catch(error){
        res.status(500).json({message:"internal server error"});
    }
});

router.get("/get-user-info",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const data = await user.findById(id).select('-password');
        return res.status(200).json(data);

    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
});
module.exports = router;
