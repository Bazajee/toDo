import React, { useState, useData, useEffect, useContext } from 'react'
import { postRequest } from '../apiService/requestToBack'
import { useNavigate } from 'react-router-dom'



const SignUpPage = () => {
  const [email, setEmail,] = useState('')
  const [newPassword, setNewPassword]= useState('')
  const [testPassword, setTestPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()


    async function  handleSubmit (e) {
        e.preventDefault()
        const formData = { "email":email,  "password":newPassword, 'username': username };
        if (newPassword != testPassword) {
            
            setMessage('Passwords is not the same.')
            return ''
        } 
        try{
            const request =  await postRequest('/auth/sign-up', formData)
            navigate('/')
        } catch (error) {
            setMessage(`Creation failed: ${error.response.data.message}`)
        }
    }



    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p- w-100" style={{ width: '400px' }}>
            <h2 className="text-center mb-4">Welcome to Todo app !</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address *</label>
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
                <label htmlFor="username" className="form-label">Username *</label>
                <input
                type="username"
                className="form-control"
                id="unsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">New password *</label>
                <input
                type="password"
                className="form-control"
                id="newpassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                />
                <label htmlFor="password" className="form-label">Confirm password *</label>
                <input
                type="password"
                className="form-control"
                id="testpassword"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                required
                />
            </div>
            <div>
                <p className='text-danger' id='displayMessage' >{ message }</p>
            </div>
            <button type="submit" className="btn btn-primary w-100">SignUp</button>
            </form>
        </div>
        </div>
    );
};

export default SignUpPage