import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [apps, setApps] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
      return;
    }
    axios.get('http://172.83.14.144:3001/api/apps', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApps(res.data))
    .catch(() => alert('Gagal mengambil data aplikasi'));
  }, [token]);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Dashboard Admin</h2>
      <ul>
        {apps.map(app => (
          <li key={app._id}>
            <strong>{app.name}</strong> - Cookie: {app.cookie.slice(0, 30)}...
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
