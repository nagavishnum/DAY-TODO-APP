import { app, db } from "./Server";



app.post("/saveTodo", (req, res) => {
    const { todo, priority, time } = req.body;
    if (!todo || !priority || !time) {
        res.statusMessage = "Values cannot be empty";
        return res.status(400).end();
    }
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
    const sql = "INSERT INTO dayTodo (todo, date,priority,time) VALUES (?, ?,?,?)";
    db.query(sql, [todo, currentDate, priority, time], (err, result) => {
        if (err) {
            res.statusMessage = "Failed";
            return res.status(500).end();
        }
        res.statusMessage = "Success";
        return res.status(200).end();
    });
});


app.get("/todosByDate", (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
    const sql = "SELECT * FROM dayTodo WHERE date = ?";
    db.query(sql, [currentDate], (err, results) => {
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

