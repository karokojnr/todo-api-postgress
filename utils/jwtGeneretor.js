const jwt = require("jsonwebtoken");

require("dotenv").config();

function jwtGeneretor(userId) {
    const payload = {
        user: userId
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
}
module.exports = jwtGeneretor;