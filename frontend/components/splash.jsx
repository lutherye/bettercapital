import React from 'react';
import { Link } from 'react-router-dom';


const Splash = () => {

    return(
        <div className="splashPage">
            <nav className="wrapper-wrapper">
                <div className="splash-nav-wrapper">
                    <nav className="splash-nav">
                        <div className="middle-nav">
                            <Link to={"/home"}
                                className="logo-link">
                                BetterCapital
                            </Link>
                            <a href="https://github.com/lutherye/bettercapital"
                                className="github">github</a>
                            <a href="https://www.linkedin.com/in/lutherye/"
                                className="linkedin">LinkedIn</a>
                            <a href="https://www.appacademy.io/?location=new-york-city"
                                className="app">App Academy</a> 
                        </div>
                            
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
            </nav>


            <div className="main-wrapper">
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
                        <div className="main-small">
                            Invest in stocks, ETFs, options, and
                            cryptocurrencies, all comission-free, 
                            right from your phone or desktop.
                        </div>
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
                    <div className ="main-splash-wrapper">
                        <img className="top-main-splash" src={window.phonePicture}/>
                    </div>
                </div>
            </div>




            <div className="cat-div">
                <div className="cat-wrapper">
                    <img src={window.catPicture} 
                        alt="investment-cat"
                        className="splash-cat"
                    />
                        <div className="cash-wrapper">
                            <span className="cash">Cash management, coming soon.</span>
                        </div>
                </div>
            </div>
        </div>
    )
};

export default Splash;