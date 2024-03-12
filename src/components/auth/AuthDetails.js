import React,  { useEffect, useState } from "react";
import {auth} from '../../firebase';
import { onAuthStateChanged} from "firebase/auth";


// Function component to display authentication details
function AuthDetails(){ 
    const [authUser, setAuthUser] = useState(null);
    const [name, setName] = useState(null);
    useEffect( () => {
        const listen = onAuthStateChanged(auth, (userCredential)=>{
            if(userCredential){
                setAuthUser(userCredential);
                setName(userCredential.displayName)
            }
            else{
                setAuthUser(null);
            }
        });
        return()=>{
            listen();
        }
    }, []);
    return(
        <div>
            {authUser ? <><p>{` Signed In as ${name}`}</p></>: <p>Signed Out</p>}
        </div>
    );
}
export default AuthDetails;

