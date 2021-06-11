const pool = require("../database/db")
exports.getHome = async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1",
            [req.user.id]
        );
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
exports.createTodo = async (req, res) => {
    try {
        const { description } = req.body;
        const todo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
};
exports.getTodos = async (req, res) => {
    try {
        const all_todos = await pool.query("SELECT * FROM todo")
        res.json(all_todos.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
}
exports.getTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [todo_id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
}
exports.updateTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        const { description } = req.body;
        await pool.query(`UPDATE todo SET description = $1 WHERE id = $2`, [description, todo_id]);
        res.json("Updated...");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
}
exports.deleteTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        await pool.query("DELETE FROM todo WHERE id = $1", [todo_id]);
        res.json("Deleted!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
}