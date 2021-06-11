
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "karokojnr",
    password: "karokojnr",
    host: "postgres",
    port: 5432,
    database: "todo_db"
});
module.exports = pool;