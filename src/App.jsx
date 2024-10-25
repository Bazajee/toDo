import './App.css'
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth, AuthProvider}from './appState/authData'
import { NotesProvider } from './appState/noteData'

import Navbar from './components/Navbar'
import LoginPage from './pages/loginPage'
import HomePage from './pages/home'
import SignUpPage from './pages/signUp'
import NotePage from './pages/notePage'


const MainApp = () => {
  const { user } = useAuth()

  return (
    <> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <div className="container-fluid"  style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%',  
            height: 'auto', 
            maxHeight: '100vh',  
            overflowY: 'auto',   
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start' 
        }}>
            <Navbar className=""/>
            <div id='roote-container' className="container-fluid mt-1 mb-1 p-0 d-flex flex-column align-items-start justify-content-start">
                <Routes>
                <Route path="/" element={user ? <HomePage /> : <Navigate to="/login"/>}/>
                <Route path="/login" element={user ? <Navigate to="/"/>: <LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/note/:id?" element={<NotePage/>}/>
                </Routes>
            </div> 
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <Router>
          <MainApp /> 
        </Router>
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;