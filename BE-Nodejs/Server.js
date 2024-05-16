// server.js
import cors from "cors";
import mysql from "mysql";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json()); // This line is necessary to parse JSON request bodies


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Vishnu1@",
    database: "todo",
});

 const initializeDatabase = () => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS dayTodo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        todo VARCHAR(255) NOT NULL,
        status BOOLEAN DEFAULT false,
        date DATE NOT NULL
    )`;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error("Error creating table:", err);
        } else {
            console.log("Table 'dayTodo' created or already exists");
        }
    });
};
app.post("/saveTodo", (req, res) => {
    const { todo, date } = req.body;
    const sql = "INSERT INTO dayTodo (todo, date) VALUES (?, ?)";
    db.query(sql, [todo, date], (err, result) => {
        if (err) {
            console.error("Error saving todo:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json({ message: "Todo saved successfully" });
    });
});

app.get("/getAllTodos", (req, res) => {
    const sql = "SELECT * FROM dayTodo";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching todos:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(result);
    });
});


const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    initializeDatabase();
});
