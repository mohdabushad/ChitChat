const jwt = require("jsonwebtoken");
const users = require("../models/user");

const ensureAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SCKEY);

    const user = await users.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized, token invalid or expired" });
  }
};

module.exports = ensureAuth;

