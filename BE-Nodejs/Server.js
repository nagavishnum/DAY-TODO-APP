// server.js
import cors from "cors";
import express from "express";
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json()); // This line is necessary to parse JSON request bodies

const PORT = 8081;

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
        time TIME NOT NULL,
        date Date NOT NULL,
        priority ENUM('High', 'Medium', 'Low') NOT NULL,
        status ENUM('PENDING', 'ONGOING', 'DONE') DEFAULT 'PENDING' NOT NULL
    )`;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error("Error creating table:", err);
        }
    });
};
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    initializeDatabase();
});

app.post("/saveTodo", (req, res) => {
    const { todo, priority, time } = req.body;
    const currentDate = new Date();
    if (!todo || !priority || !time) {
        res.statusMessage = "Values cannot be empty";
        return res.status(400).end();
    }
    const sql = "INSERT INTO dayTodo (todo,priority,time,date) VALUES (?,?,?,?)";
    db.query(sql, [todo, priority, time, currentDate], (err, result) => {
        if (err) {
            res.statusMessage = "Failed";
            return res.status(500).end();
        }
        res.statusMessage = "Success";
        return res.status(200).end();
    });
});

app.get("/getAllTodos", (req, res) => {
    const sql = "SELECT * FROM dayTodo";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching todos by date:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(results);
    });
});

app.get("/filterByDatePrioroty/:filterpriority", (req, res) => {
    const priority = req.params.filterpriority;
    const sql = "SELECT * FROM dayTodo WHERE priority = ?";
    db.query(sql, [priority], (err, results) => {
        if (err) {
            console.error("Error fetching todos by date:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(results);
    });
});

app.put("/updateTodoStatus", (req, res) => {
    const { status, id } = req.body;
    const sql = "UPDATE dayTodo SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Error updating todo status:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json({ message: "Todo status updated successfully" });
    });
});
app.delete("/deleteTodo/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM dayTodo WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting todo:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json({ message: "Todo deleted successfully" });
    });
});

app.delete("/deleteByDate", (req, res) => {
    const currentDate = new Date(); // This represents the current date and time in the server's timezone
    const currentYear = currentDate.getFullYear();
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month since JavaScript months are zero-based
    const currentDay = ('0' + currentDate.getDate()).slice(-2);
    const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const sql = "DELETE FROM dayTodo WHERE DATE(date) != ?";
    db.query(sql, [formattedDate], (err, result) => {
        if (err) {
            console.error("Error deleting todo:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (result.affectedRows > 0) {
            return res.json({ message: "YES" });
        } else {
            return res.json({ message: "No" });
        }
    });
});




