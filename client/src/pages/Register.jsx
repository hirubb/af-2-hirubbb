import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from "../services/user-service";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success,setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, password } = formData;

    if (!name || !username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await registerUser(formData)
      console.log(response);
      if (response.status === 201) {
        setSuccess(response.data.message);
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'url("/your-background.jpg") center/cover no-repeat',
        padding: '20px',
      }}
    >
      <div
        className="card p-4 rounded-4 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '500px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>
          Create Your Account
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              Register
            </button>
          </div>
        </form>

        <p className="mt-4 mb-0 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
