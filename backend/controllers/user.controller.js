import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new user
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Basic validation
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

      
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        // Handle file upload if provided
        let profilePhotoUrl = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl, 
            },
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// User login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Basic validation
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Check role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false,
            });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY || "default_secret", { expiresIn: "1d" });

        // Mask sensitive user info before returning
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true,
            });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// User logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false,
            });
        }

        // Update fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Process and update profile photo if a new file is provided
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true,
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
