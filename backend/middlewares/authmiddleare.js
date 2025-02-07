const jwt = require('jsonwebtoken');
const secretKey = "1234567"; 
const ensureAuthenticated = (req, res, next) => {
    // Extract the Authorization header
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized: Missing token" });
    }
    
    // Extract token from "Bearer <token>" format
    const token = authHeader;
    // console.log(token);

    if (!token) {
        return res.status(403).json({ message: "Unauthorized: Invalid token format" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized: Token verification failed", error });
    }
};

module.exports = ensureAuthenticated;
