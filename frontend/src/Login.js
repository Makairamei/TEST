import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL + '/api/auth/login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(backendUrl, { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>Login Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
