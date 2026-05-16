import React, { useState } from 'react';
import axios from 'axios';
import { Search, Filter, Trash2, CheckCircle, Clock, MoreVertical } from 'lucide-react';

const TaskList = ({ tasks, onTaskUpdated }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        onTaskUpdated();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.TaskName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || task.Status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': case 'Urgent': return 'var(--primary-color)';
      case 'Normal': return '#eab308';
      default: return 'var(--secondary-color)';
    }
  };

  return (
    <div className="fade-in">
      <div className="glass" style={{ padding: '1.2rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="form-control" 
            style={{ paddingLeft: '40px' }} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Filter size={18} color="var(--text-muted)" />
          <select 
            className="form-control" 
            style={{ width: '150px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="glass" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '1.2rem' }}>Task Detail</th>
              <th style={{ padding: '1.2rem' }}>Type</th>
              <th style={{ padding: '1.2rem' }}>Priority</th>
              <th style={{ padding: '1.2rem' }}>Timeline</th>
              <th style={{ padding: '1.2rem' }}>Status</th>
              <th style={{ padding: '1.2rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.ID} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'var(--transition)' }} className="task-row">
                <td style={{ padding: '1.2rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>{task.TaskName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{task.Tags || 'No tags'}</div>
                </td>
                <td style={{ padding: '1.2rem' }}>
                  <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>{task.Type}</span>
                </td>
                <td style={{ padding: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: getPriorityColor(task.Priority), fontSize: '0.85rem', fontWeight: '600' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: getPriorityColor(task.Priority) }}></div>
                    {task.Priority}
                  </div>
                </td>
                <td style={{ padding: '1.2rem' }}>
                  <div style={{ fontSize: '0.8rem' }}>{task.StartDate ? new Date(task.StartDate).toLocaleDateString() : '-'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Est: {task.EstTime}h</div>
                </td>
                <td style={{ padding: '1.2rem' }}>
                  <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem',
                    color: task.Status === 'Completed' ? 'var(--secondary-color)' : task.Status === 'In Progress' ? 'var(--primary-color)' : 'var(--text-muted)'
                  }}>
                    {task.Status === 'Completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {task.Status}
                  </div>
                </td>
                <td style={{ padding: '1.2rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleDelete(task.ID)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff4b2b', padding: '0.4rem' }}>
                      <Trash2 size={18} />
                    </button>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.4rem' }}>
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No tasks found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .task-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}} />
    </div>
  );
};

export default TaskList;
