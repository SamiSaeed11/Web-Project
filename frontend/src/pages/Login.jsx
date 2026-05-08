import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);

      if (data.role === 'hr' || data.role === 'admin') {
        navigate('/hr-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '50px auto' }}>
      <div className="card">
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login to ATS</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f3f4f6', borderRadius: '6px' }}>
          <p style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>Test Accounts:</p>
          <p style={{ fontSize: '13px', margin: '5px 0' }}>Admin: admin@ats.com / admin123</p>
          <p style={{ fontSize: '13px', margin: '5px 0' }}>HR: hr@ats.com / hr123</p>
          <p style={{ fontSize: '13px', margin: '5px 0' }}>Candidate: candidate@example.com / candidate123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
