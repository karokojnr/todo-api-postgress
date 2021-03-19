
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "karokojnr",
    password: "karokojnr",
    host: "localhost",
    port: 5432,
    database: "tododb"
});
module.exports = pool;