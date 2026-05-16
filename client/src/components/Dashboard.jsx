import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';

const Dashboard = ({ stats, tasks }) => {
  const data = [
    { name: 'Completed', value: stats.completed, color: '#00f2ff' },
    { name: 'In Progress', value: stats.inProgress, color: '#ff3b5c' },
    { name: 'Planned', value: stats.total - stats.completed - stats.inProgress, color: '#8b949e' },
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="glass" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{title}</p>
          <h3 style={{ fontSize: '2rem', fontWeight: '700' }}>{value}</h3>
        </div>
        <div style={{ background: `${color}20`, padding: '0.8rem', borderRadius: '12px' }}>
          <Icon size={24} color={color} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', background: color }}></div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="dashboard-grid">
        <StatCard title="Total Tasks" value={stats.total} icon={TrendingUp} color="#a855f7" />
        <StatCard title="Completed" value={stats.completed} icon={CheckCircle2} color="var(--secondary-color)" />
        <StatCard title="In Progress" value={stats.inProgress} icon={Clock} color="var(--primary-color)" />
        <StatCard title="Pending" value={stats.total - stats.completed} icon={AlertCircle} color="#eab308" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div className="glass" style={{ padding: '1.5rem', minHeight: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Task Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8b949e', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b949e', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ background: '#1a1d2d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.slice(0, 5).map(task => (
              <div key={task.ID} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: task.Priority === 'High' ? 'var(--primary-color)' : 'var(--secondary-color)' }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '500' }}>{task.TaskName}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{task.Status}</p>
                </div>
              </div>
            ))}
            {tasks.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>No tasks found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
