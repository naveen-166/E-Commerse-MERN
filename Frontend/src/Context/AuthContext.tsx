import React from 'react'
import { createContext,useState } from 'react'

export const Authcontext=createContext();

export const AuthProvider = ({ children }) => {
    const [Logged ,setLogged]=useState(false);
    const [Email,setEmail]=useState(null);
    const [Role,setRole]=useState(null);
    return(
        <Authcontext.Provider value={{Email , setEmail, Logged,setLogged}}>
            {children}
        </Authcontext.Provider>
    )
}