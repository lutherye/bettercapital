import React from 'react';
import { Link } from 'react-router-dom';


const Splash = () => {
    return(
        <div className="splashPage">
            <div className="splash-nav-wrapper">
                <div className="splash-nav">
                        <Link to={"/"}
                            className="logo-link">
                            BetterCapital
                        </Link>
                        
                    <div className="splash-auth">
                        <Link
                            className="splash-log"
                            to={"/login"}>Log In
                        </Link>
                        <Link 
                            className="splash-sign"
                            to={"/signup"}>Sign Up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="top-main">
                <div className="top-main-splash">

                </div>

            </div>
        </div>
    )
};

export default Splash;