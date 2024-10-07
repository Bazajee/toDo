import React, { useState, useData } from 'react'
import { postRequest } from '../apiService.js/requestToBack'

const loginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Email:', email)
    console.log('Password:', password)
    
    const formData = { "email":email,  "password":password };
    console.log(formData)
        try {
          const response = await postRequest(formData, '/auth/login');
          console.log('Login successful:', response);
        } catch (error) {
          console.error('Login failed:', error);
        }
      
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p- w-100" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">Forgot your password?</a>
        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">New user? </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default loginPage