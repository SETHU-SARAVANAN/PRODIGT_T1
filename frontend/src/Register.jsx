import { useState } from 'react';
import axios from 'axios';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('Registered successfully');
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  }

  return (
    <div className="outer-wrapper">
      <div className="register-container">
        <h2>Register</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button onClick={handleRegister}>Register</button>

        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
