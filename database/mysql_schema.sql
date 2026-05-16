-- Create Tasks Table for MySQL
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
);

-- Sample Data
INSERT INTO Tasks (TaskName, Type, Status, StartDate, Deadline, EstTime, ActTime, Priority, Tags, Description)
VALUES 
('Update System UI', 'New', 'In Progress', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 10.5, 4.0, 'High', 'UI, React', 'Upgrade the dashboard theme to dark mode.'),
('Bug Fix: Login Error', 'Review', 'Completed', DATE_SUB(NOW(), INTERVAL 2 DAY), NOW(), 2.0, 2.5, 'High', 'Bug, Auth', 'Fixed the 401 error on login page.');
