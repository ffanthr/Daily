import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, PlusCircle, ListTodo, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, priorityStats: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, statsRes] = await Promise.all([
        axios.get('/api/tasks'),
        axios.get('/api/stats')
      ]);
      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} tasks={tasks} />;
      case 'add':
        return <TaskForm onTaskAdded={fetchData} />;
      case 'list':
        return <TaskList tasks={tasks} onTaskUpdated={fetchData} />;
      default:
        return <Dashboard stats={stats} tasks={tasks} />;
    }
  };

  return (
    <div className="container fade-in">
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
            <span style={{ color: 'var(--primary-color)' }}>Taskmen</span>
            <span style={{ color: 'var(--secondary-color)' }}>HR</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Personnel Task Management System</p>
        </div>
        <div className="glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="var(--secondary-color)" />
          <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>System Online</span>
        </div>
      </header>

      <div className="tabs glass">
        <div 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <LayoutDashboard size={18} /> Dashboard
          </div>
        </div>
        <div 
          className={`tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <PlusCircle size={18} /> Add New
          </div>
        </div>
        <div 
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ListTodo size={18} /> All Items
          </div>
        </div>
      </div>

      <main>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div className="loader">Loading...</div>
          </div>
        ) : (
          renderContent()
        )}
      </main>

      <footer style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        &copy; 2026 TaskmenHR System. Built with React & SQL Server.
      </footer>
    </div>
  );
};

export default App;
