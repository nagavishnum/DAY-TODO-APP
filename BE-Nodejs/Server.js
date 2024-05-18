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
        priority ENUM('High', 'Medium', 'Low') NOT NULL,
        status ENUM('PENDING', 'ONGOING', 'DONE') DEFAULT 'PENDING' NOT NULL,
        date DATE NOT NULL
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
export  {app,db};