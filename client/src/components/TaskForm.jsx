import React, { useState } from 'react';
import axios from 'axios';
import { Send, Calendar, Clock, Tag } from 'lucide-react';

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    type: 'New',
    status: 'Planned',
    startDate: '',
    deadline: '',
    estTime: 0,
    actTime: 0,
    priority: 'Normal',
    tags: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', formData);
      alert('Task added successfully!');
      onTaskAdded();
      setFormData({
        taskName: '',
        type: 'New',
        status: 'Planned',
        startDate: '',
        deadline: '',
        estTime: 0,
        actTime: 0,
        priority: 'Normal',
        tags: '',
        description: ''
      });
    } catch (err) {
      console.error('Error adding task:', err);
      alert('Failed to add task.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fade-in glass" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ background: 'var(--primary-color)', width: '4px', height: '24px', borderRadius: '4px' }}></div>
        Create New Task
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label>Task Name / ชื่อโครงการ</label>
            <input 
              type="text" name="taskName" required className="form-control" 
              placeholder="Enter task name..." value={formData.taskName} onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Type / ประเภท</label>
            <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
              <option value="New">New Project</option>
              <option value="Review">Review / Audit</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority / ความสำคัญ</label>
            <select name="priority" className="form-control" value={formData.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="form-group">
            <label><Calendar size={14} /> Start Date</label>
            <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label><Calendar size={14} /> Deadline</label>
            <input type="date" name="deadline" className="form-control" value={formData.deadline} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label><Clock size={14} /> Est. Time (Hours)</label>
            <input type="number" step="0.5" name="estTime" className="form-control" value={formData.estTime} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label><Tag size={14} /> Tags (Comma separated)</label>
            <input type="text" name="tags" className="form-control" placeholder="e.g. HR, Payroll" value={formData.tags} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label>Description / รายละเอียด</label>
          <textarea 
            name="description" rows="4" className="form-control" 
            placeholder="Detailed description of the task..." value={formData.description} onChange={handleChange}
          ></textarea>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 3rem' }}>
            <Send size={18} /> Submit Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
