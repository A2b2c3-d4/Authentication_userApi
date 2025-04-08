const jwt = require('jsonwebtoken');
 
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization'); // Get token from header

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        // const secretKey = "your_secret_key"; // Use an environment variable in production
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Move to next middleware/controller
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
    
};

module.exports = authenticateJWT;