
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Protected() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/protected', {
      headers: { Authorization: token },
    }).then(res => setMessage(res.data)).catch(() => setMessage('Access denied'));
  }, []);

  return <h2>{message}</h2>;
}
