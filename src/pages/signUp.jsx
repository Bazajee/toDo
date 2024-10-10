import React, { useState, useData, useEffect, useContext } from 'react'
import { postRequest } from '../apiService/requestToBack'
import { useAuth } from '../appState/authData'
import { useNavigate } from 'react-router-dom';



const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, user } = useAuth() 
  const navigate = useNavigate()

  const  handleSubmit = async (e) => {
    e.preventDefault()
    const formData = { "email":email,  "password":password };
    navigate('/')
  }


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p- w-100" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">SignUp</h2>
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
      </div>
    </div>
  );
};

export default SignUpPage