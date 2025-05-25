const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CA = require("../models/CA");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

exports.registerUser = async (req, res) => {
    const { fullName, email, password, role, licenseNumber, yearOfRegistration, practiceArea } = req.body;
    
    if (!fullName || !email || !password || !role) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Validate CA-specific fields if role is 'ca'
    if (role === 'ca' && (!licenseNumber || !yearOfRegistration || !practiceArea)) {
        return res.status(400).json({ message: "CA registration requires license number, year of registration, and practice area" });
    }

    try {
        // Check if email already exists in both User and CA collections
        const existingUser = await User.findOne({ email });
        const existingCA = await CA.findOne({ email });
        
        if (existingUser || existingCA) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Check if CA license number already exists (only for CA registration)
        if (role === 'ca') {
            const existingLicense = await CA.findOne({ licenseNumber });
            if (existingLicense) {
                return res.status(400).json({ message: "License number already registered" });
            }
        }

        let newUser;
        
        if (role === 'ca') {
            // Create CA account
            newUser = await CA.create({
                fullName,
                email,
                password,
                role: 'ca',
                licenseNumber,
                yearOfRegistration,
                practiceArea
            });
        } else {
            // Create normal user account
            newUser = await User.create({
                fullName,
                email,
                password,
                role: 'user'
            });
        }

        res.status(201).json({
            id: newUser._id,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                ...(role === 'ca' && {
                    licenseNumber: newUser.licenseNumber,
                    yearOfRegistration: newUser.yearOfRegistration,
                    practiceArea: newUser.practiceArea,
                    isVerified: newUser.isVerified
                })
            },
            token: generateToken(newUser._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        // Check both User and CA collections
        let user = await User.findOne({ email });
        let userType = 'user';
        
        if (!user) {
            user = await CA.findOne({ email });
            userType = 'ca';
        }
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const userResponse = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            ...(userType === 'ca' && {
                licenseNumber: user.licenseNumber,
                yearOfRegistration: user.yearOfRegistration,
                practiceArea: user.practiceArea,
                isVerified: user.isVerified
            })
        };
        
        res.status(200).json({
            id: user._id,
            user: userResponse,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        // Check both collections
        let user = await User.findById(req.user.id).select("-password");
        let userType = 'user';
        
        if (!user) {
            user = await CA.findById(req.user.id).select("-password");
            userType = 'ca';
        }
        
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user info", error: err.message });
    }
};