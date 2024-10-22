import './App.css'
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth, AuthProvider}from './appState/authData'
import { NotesProvider } from './appState/noteData';

import Navbar from './components/Navbar'
import LoginPage from './pages/loginPage'
import HomePage from './pages/home'
import SignUpPage from './pages/signUp';


const MainApp = () => {
  const { user } = useAuth()

  return (
    <> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <Navbar className="vh-100 w-100"/>
      <div className="container-fluid w-100 vh-100 d-flex flex-column ">
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />}/>
          <Route path="/login" element={user ? <Navigate to="/"/>: <LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* <Route path="/empty" element={<EmptyPage />} /> */}
        </Routes>
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