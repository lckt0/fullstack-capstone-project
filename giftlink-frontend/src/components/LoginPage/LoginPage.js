import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrect, setIncorrect] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('auth-token')
            ? `Bearer ${sessionStorage.getItem('auth-token')}`
            : '',
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', json.userName);
        sessionStorage.setItem('email', json.userEmail);
        navigate('/app');
        window.location.reload();
      } else {
        setIncorrect(json.error || 'Login failed');
      }
    } catch (e) {
      setIncorrect(e.message);
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="error">{incorrect}</div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
