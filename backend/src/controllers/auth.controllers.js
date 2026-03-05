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
        xp: 0,
        level: 1,
        longestStreak: 0
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email : user.email,
        xp: user.xp,
        level: user.level,
        longestStreak: user.longestStreak,
        token : generateToken(user._id),
    });
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
        xp: user.xp,
        level: user.level,
        longestStreak: user.longestStreak,
        token : generateToken(user._id),
    })
}

// Get Current User Profile (me)
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// Update User Profile
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            
            // Allow changing email only if it's not taken by someone else
            if (req.body.email && req.body.email !== user.email) {
                const emailExists = await User.findOne({ email: req.body.email });
                if (emailExists) {
                    return res.status(400).json({ message: "Email already in use" });
                }
                user.email = req.body.email;
            }

            if (req.body.password) {
                user.password = await bcrypt.hash(req.body.password, 10);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                xp: updatedUser.xp,
                level: updatedUser.level,
                longestStreak: updatedUser.longestStreak,
                token: generateToken(updatedUser._id),
                message: "Profile updated successfully"
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error updating profile", error: error.message });
    }
}
