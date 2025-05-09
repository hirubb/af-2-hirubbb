import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
  
    try {
      const response = await login(email, password); // 🛠️ FIXED: pass as two arguments & await
      if (response) {
        setSuccess("Successful Login");
        setError("");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setSuccess("");
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center" 
      style={{
        minHeight: '100vh',
        background: 'url("/your-background.jpg") center/cover no-repeat',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="card shadow-lg p-4 rounded-4" style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>
          Login
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">email</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-decoration-none" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
