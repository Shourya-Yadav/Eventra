import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Generate Token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};



// REGISTER
export const register = async (req, res) => {
    try {

        const { name, email, password, role, category } = req.body;

        // check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            category
        });

        res.status(201).json({
            message: "User registered successfully",
            token: generateToken(user),
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// LOGIN
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            message: "Login successful",
            token: generateToken(user),
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
