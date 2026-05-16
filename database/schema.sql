-- Create Tasks Table
CREATE TABLE Tasks (
    ID INT PRIMARY KEY IDENTITY(1,1),
    TaskName NVARCHAR(255) NOT NULL,
    Type NVARCHAR(50), -- New, Review, etc.
    Status NVARCHAR(50) DEFAULT 'Planned', -- Planned, In Progress, Completed
    StartDate DATETIME,
    Deadline DATETIME,
    EstTime DECIMAL(10, 2), -- Estimated hours
    ActTime DECIMAL(10, 2), -- Actual hours
    Priority NVARCHAR(20), -- Low, Normal, High
    Tags NVARCHAR(MAX), -- Comma separated tags
    Description NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Sample Data
INSERT INTO Tasks (TaskName, Type, Status, StartDate, Deadline, EstTime, ActTime, Priority, Tags, Description)
VALUES 
('Update System UI', 'New', 'In Progress', GETDATE(), DATEADD(day, 7, GETDATE()), 10.5, 4.0, 'High', 'UI, React', 'Upgrade the dashboard theme to dark mode.'),
('Bug Fix: Login Error', 'Review', 'Completed', DATEADD(day, -2, GETDATE()), GETDATE(), 2.0, 2.5, 'High', 'Bug, Auth', 'Fixed the 401 error on login page.');
