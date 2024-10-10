import { createContext, useState, useContext, useEffect } from "react"
import Cookies from 'js-cookie';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(sessionStorage.getItem('appUser'))


  const login = (newData) => {
    sessionStorage.setItem('appUser', newData)
    setUser(newData);
  };

  const logout = () => {
    setUser(null)
    Cookies.remove('jwt')
    sessionStorage.clear()
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
