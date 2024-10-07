import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import LoginPage from './pages/loginPage';
import HomePage from './pages/home'


function App() { 
   return (
      <Router>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/empty" element={<EmptyPage />} /> */}
        </Routes>
      </Router>
    );
  };

  


export default App