
import jwtDecode from "jwt-decode";


/**
 * Permet de savoir si on est authentifié ou pas.
 * @returns boolean
 */
function isAuthenticated() {
    // voir si on a un token
    const token = window.localStorage.getItem("authToken");
    // si le token est encore valide alors on va donner le token à axios
    if(token) {
        const { exp: expiration } = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()) {
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default  {
    isAuthenticated
    }
