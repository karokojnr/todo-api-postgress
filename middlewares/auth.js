const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const jwt_token = req.header("jwt_token");
        if (!jwt_token) {
            return res.status(403).json({message: "Not Authorized"});
        }
        const payload = jwt.verify(jwt_token, process.env.JWT_SECRET);
        req.user = payload.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json({message: "Not Authorized"});
    }
}