import React from 'react';
import { Link } from 'react-router-dom';


const Splash = () => {
    return(
        <div className="splashPage">
            <div className="splash-nav-wrapper">
                <nav className="splash-nav">
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
                </nav>
            </div>
            <div className="top-main">
                <div className="top-main-content">
                    <div className="main-big">
                        <div className="invest">
                            Invest
                        </div>
                        <div className="comission-free">
                            Comission-Free
                        </div>
                    </div>
                    <span className="main-small">
                        Invest in stocks, ETFs, options, and
                        cryptocurrencies, all comission-free, 
                        right from your phone or desktop.
                    </span>
                    <div className="main-sign">
                        <Link
                        className="splash-sign"
                        to={"/signup"}>Sign Up
                        </Link>
                    </div>
                    <div className="comission">
                        Comissions Disclosure 
                        <div className="question">
                            <i className="far fa-question-circle"></i>
                        </div>
                    </div>
                </div>
                <div className="top-main-splash">

                </div>

            </div>
        </div>
    )
};

export default Splash;