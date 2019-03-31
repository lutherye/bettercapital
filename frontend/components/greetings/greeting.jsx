import React from 'react';
import { Link } from 'react-router-dom';
import Splash from '../splash';


const Greeting = ({currentUser, logout}) => {

    const personalGreeting = () => {
        return(
            <div className="greet-page">
                <nav className="greet-nav">
                    <div className="login-logo-link">
                        <Link to={"/"}
                            className="logo-link">
                                BetterCapital
                            </Link>
                    </div>
                </nav>


                <button className="header-button" onClick={()=> logout()}>Log Out</button>
            </div>
        )
    }

    return currentUser ? personalGreeting() : Splash();
}


export default Greeting;