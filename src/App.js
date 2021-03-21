import React, { useState } from 'react'
import jwtDecode from  "jwt-decode"
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

import AuthAPI       from "./services/AuthAPI"
import AuthContext   from "./contexts/AuthContext"
import MainPage      from './pages/MainPage'
import BarreMenu     from './components/BarreMenu'

// voir si on a un token
const token = window.localStorage.getItem("authToken");
// si le token est encore valide alors on va donner le token à axios
if(token) {
    const { exp: expiration } = jwtDecode(token);
    if(expiration * 1000 > new Date().getTime()) {
      axios.defaults.headers["Authorization"] = "Bearer " + token;
    }
}

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated)

  return (

    <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
            }}>
          <BarreMenu />
          
          <MainPage />
          
          <ToastContainer  position={toast.POSITION.BOTTOM_RIGHT} />

    </AuthContext.Provider>
  );
}

export default App;
