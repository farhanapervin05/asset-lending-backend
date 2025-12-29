const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

exports.register=async(req, res)=>{
    try{
        const {name, email, password} = req.body;

        //basic validation 
        if(!name || !email || !password){
            return res.status(400).json({message:"name, email and password are required"})
        }

        //checking if user already exists 
        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(409).json({message: "user with this email already exists"})
        }

        //hash password
        const passwordHash = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, passwordHash});

        return res.status(201).json({message: "User registered successfully"})

    }catch(error){
        console.error("Register error", error)
        return res.status(500).json({message: "Something went wrong"})
    }
}

exports.login = async(req,res)=>{
    try{
        const {email, password} = req.body;

        //basic validation 
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }

        const user = await User.findOne({email});

        //checking user's existence 
        if(!user){
            return res.status(401).json({message: "invalid email or password"});
        }

        //validating credentials
        const isMatch = await bcrypt.compare(password, user.passwordHash)

        if(!isMatch){
            return res.status(401).json({message: "invalid email or password"});
        }

        const token = generateToken({
            id: user._id,
            role: user.role
        })
        return res.json({message :"Login successful", token})

    }catch(error){
        console.error("Login error", error)
        return res.status(500).json({message: "Something went wrong"});
    }
}