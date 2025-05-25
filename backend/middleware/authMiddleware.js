const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CA = require('../models/CA');

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check both User and CA collections
        let user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            user = await CA.findById(decoded.id).select('-password');
        }
        
        if (!user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }
        
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Not Authorized, token failed" });
    }
}