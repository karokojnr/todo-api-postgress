const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const todo_routes = require("./routes/todo");
app.use("/", todo_routes);

app.listen(PORT, (req, res, next) => {
    console.log(`App running on ${PORT}`);
});
