import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// generate token 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


// Register User



export const registerUser = async (req , res) =>{
    const {name , email , password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists) {
        return res.status(400).json({message : "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await User.create({
        name,
        email,
        password : hashedPassword,
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email : user.email,
        token : generateToken(user._id),
    });
    console.log("BODY:", req.body);
};

// registerUser();

// Login 
export const loginUser = async (req , res) =>{
    const {email , password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(400).json({message : "Invalid Credentials"});
    };

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch) {
        return res.status(400).json({message : "Invalid credentials"});
    };


    res.json({
        _id : user._id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id),
    })
}