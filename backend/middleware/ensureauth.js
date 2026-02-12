const jwt = require("jsonwebtoken");
const users = require('../models/user');
const ensureAuth = async(req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SCKEY);
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized, token invalid or expired" });
        }

        const user = await users.findById(decoded.id)
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, token invalid or expired" });
    }
};

module.exports = ensureAuth;

