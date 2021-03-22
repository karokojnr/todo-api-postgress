const pool = require("../database/db")
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const jwtGeneretor = require("../utils/jwtGeneretor");


exports.postUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length != 0) {
            return res.status(401).send("User already exists!");
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);
        const token = jwtGeneretor(newUser.rows[0].user_id);
        res.json({ token });
    } catch (error) {
        console.log(chalk.red(error.message));
        res.status(500).send("Server Error...");
    }
}
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users where user_email=$1", [email]);
        if (user.rows[0] === 0) {
            res.status(401).json("Password or Email is incorrect!");
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect!");
        }
        const token = jwtGeneretor(user.rows[0].user_id);
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
}
exports.getAuthorization = (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
}