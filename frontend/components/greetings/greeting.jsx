import React from 'react';
import { Link } from 'react-router-dom';
import Splash from '../splash';


const Greeting = ({currentUser, logout}) => {

    const personalGreeting = () => {
        return(
            <>
                <h2>BetterCapital</h2>
                <button className="header-button" onClick={()=> logout()}>Log Out</button>
            </>
        )
    }

    return currentUser ? personalGreeting() : Splash();
}


export default Greeting;