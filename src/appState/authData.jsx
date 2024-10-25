import { createContext, useState, useContext, useEffect } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('appUser')
    return storedUser ? JSON.parse(storedUser) : null
  })


  const login = (newData) => {
    sessionStorage.setItem('appUser', JSON.stringify(newData))
    setUser(newData)
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('jwt')
    sessionStorage.clear()
    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
