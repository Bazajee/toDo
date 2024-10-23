import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App className="container-fluid w-100 h-100 d-flex flex-column align-items-start justify-content-start"/>
  </StrictMode>,
)
