const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auto-initialize Database Table
const initDB = async () => {
    try {
        const schema = `
        CREATE TABLE IF NOT EXISTS Tasks (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            TaskName VARCHAR(255) NOT NULL,
            Type VARCHAR(50), 
            Status VARCHAR(50) DEFAULT 'Planned', 
            StartDate DATETIME,
            Deadline DATETIME,
            EstTime DECIMAL(10, 2), 
            ActTime DECIMAL(10, 2), 
            Priority VARCHAR(20), 
            Tags TEXT, 
            Description TEXT,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        await pool.query(schema);
        console.log('Database Table Initialized');
    } catch (err) {
        console.error('Database Initialization Failed:', err.message);
    }
};

initDB();

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Tasks ORDER BY CreatedAt DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get stats for dashboard
app.get('/api/stats', async (req, res) => {
    try {
        const [total] = await pool.query('SELECT COUNT(*) as count FROM Tasks');
        const [completed] = await pool.query("SELECT COUNT(*) as count FROM Tasks WHERE Status = 'Completed'");
        const [inProgress] = await pool.query("SELECT COUNT(*) as count FROM Tasks WHERE Status = 'In Progress'");
        const [priorityStats] = await pool.query('SELECT Priority, COUNT(*) as count FROM Tasks GROUP BY Priority');

        res.json({
            total: total[0].count,
            completed: completed[0].count,
            inProgress: inProgress[0].count,
            priorityStats: priorityStats
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create task
app.post('/api/tasks', async (req, res) => {
    const { taskName, type, status, startDate, deadline, estTime, actTime, priority, tags, description } = req.body;
    try {
        const query = `INSERT INTO Tasks (TaskName, Type, Status, StartDate, Deadline, EstTime, ActTime, Priority, Tags, Description) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [taskName, type, status, startDate || null, deadline || null, estTime || 0, actTime || 0, priority, tags, description];
        await pool.query(query, values);
        res.status(201).send('Task Created');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM Tasks WHERE ID = ?', [req.params.id]);
        res.send('Task Deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
