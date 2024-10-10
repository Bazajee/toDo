import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useAuth } from "../appState/authData";

const Navbar = () => {
   const { logout } = useAuth();

   return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
         <div className="container-fluid">
            <a className="navbar-brand" href="#">
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
                     className="nav-link active"
                     aria-current="page"
                     href="#"
                  >
                     Home
                  </button>
                  <a className="nav-link" href="#">
                     Features
                  </a>
                  <a className="nav-link" href="#">
                     Pricing
                  </a>
                  <button
                     className="nav-link "
                     onClick={logout}
                     aria-disabled="true"
                  >
                     logout
                  </button>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
