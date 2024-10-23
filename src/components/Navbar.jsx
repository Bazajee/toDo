import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min"
import { useAuth } from "../appState/authData"
import { useNavigate } from 'react-router-dom'



const Navbar = () => {

   const { logout } = useAuth()
   const navigate = useNavigate()

   function navigateToHome () {
    navigate('/')
   }

   function clickLogout () {
      logout()
      navigate('/')
     }

   return (
      <div className="container">
         <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
               <a 
                  className="navbar-brand" href="#"
                  onClick={navigateToHome}
               >
                  List
               </a>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                     <button
                        className="nav-link  disabled"
                        aria-current="page"
                        href="#"
                     >
                        Home
                     </button>
                     <a className="nav-link disabled" href="#">
                        Features
                     </a>
                     <a className="nav-link disabled " href="#">
                        Pricing
                     </a>
                     <button
                        className="nav-link "
                        onClick={clickLogout}
                        aria-disabled="true"
                     >
                        logout
                     </button>
                  </div>
               </div>
            </div>
         </nav>
      </div>
   );
};

export default Navbar;
