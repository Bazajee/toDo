import './App.css'
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth, AuthProvider}from './appState/authData'

import Navbar from './components/Navbar';
import LoginPage from './pages/loginPage';
import HomePage from './pages/home'


const MainApp = () => {
  const { user } = useAuth()
  console.log('user mainApp:',sessionStorage.getItem('appUser'))

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/login" element={user ? <HomePage /> : <Navigate to="/login" />} />
        {/* <Route path="/empty" element={<EmptyPage />} /> */}
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp /> 
      </Router>
    </AuthProvider>
  );
}

export default App;