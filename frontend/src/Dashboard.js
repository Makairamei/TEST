import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState('');
  const backendUrl = 'http://172.83.14.144:3001/api/apps'; // Endpoint aplikasi backend

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios
      .get(backendUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApps(res.data))
      .catch(() => setError('Gagal mengambil data aplikasi'));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <h2>Dashboard Admin Panel</h2>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {apps.length === 0 && <li>Tidak ada aplikasi</li>}
        {apps.map((app) => (
          <li key={app._id}>
            <strong>{app.name}</strong> - {app.description || '-'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
