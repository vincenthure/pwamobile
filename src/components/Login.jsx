import React, { useContext, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

import AuthContext    from '../contexts/AuthContext'
import { AUTH_TOKEN } from "../services/config"
import Spinner        from './Spinner'


const Login = (props) => {

    const [loading, setLoading] = useState(false);
    const {setIsAuthenticated} = useContext(AuthContext);

    const handleSubmit =()=> 
        {
        setLoading(true)
        let credentials ={
            email    : document.getElementById("email").value,
            password : document.getElementById("password").value
            }
        console.warn("credential")
        axios
            .post(AUTH_TOKEN, credentials)
            .then( (resp)=> 
                        {
                        window.localStorage.setItem("authToken", resp.data.token)
                        axios.defaults.headers.common['Authorization'] = "Bearer " + resp.data.token
                        setIsAuthenticated(true)
                        console.warn("authenfication succes")
                        props.callback()
                        setLoading(false)
                        },
                   (error)=> 
                        {
                        toast.error("email ou mot de passe incorrect : "+error.message)
                        setLoading(false)
                        }
                )
    }
    if(loading)
            return(<Spinner text={"Verification de l'authentification..."}/> ) 
    else    
            return(
                <div className="container">

                    <h3>Connexion</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input id="email"  type="email" className="form-control"  />
                    </div>

                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input id="password" type="password" className="form-control"  />
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary">Valider</button> 

                </div>
                )
}

export default Login;

