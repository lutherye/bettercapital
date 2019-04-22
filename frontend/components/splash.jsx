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
            <div className="filler-div">
                <div className="filler-holder">
                    <div className="filler-holder-holder">
                        <div className="filler-component">
                            <div className="filler-component-img">
                                <img src={window.waves} alt="stock-picture" className="filler-img"/>
                            </div>
                            <div className="filler-component-title">
                                <h3 className="filler-title">Stocks</h3>
                            </div>
                            <div className="filler-component-description">
                                <span>Invest in  ompanies you love and build out your perfect portfolio.</span>
                            </div>
                            <div className="filler-component-learn">
                                <span>Learn about stocks</span>
                            </div>
                        </div>
                        <div className="filler-component">
                            <div className="filler-component-img">
                                <img src={window.spiny} alt="etf-picture" className="filler-img"/>
                            </div>
                            <div className="filler-component-title">
                                <h3>ETFs</h3>
                            </div>
                            <div className="filler-component-description">
                                <span>Diversify your holdings by buying into a bundle of stocks in a single investment.</span>
                            </div>
                            <div className="filler-component-learn">
                                <span>Learn about ETFs</span>
                            </div>
                        </div>
                        <div className="filler-component">
                            <div className="filler-component-img">
                                <img src={window.arrows} alt="options-picture" className="filler-img"/>
                            </div>
                            <div className="filler-component-title">
                                <h3>Options</h3>
                            </div>
                            <div className="filler-component-description">
                                <span>Choose to go long on stocks you believe in and short the ones you don't.</span>
                            </div>
                            <div className="filler-component-learn">
                                <span>Learn about options</span>
                            </div>
                        </div>
                        <div className="filler-component">
                            <div className="filler-component-img">
                                <img src={window.coins} alt="crypto-picture" className="filler-img"/>
                            </div>
                            <div className="filler-component-title">
                                <h3>Crypto</h3>
                            </div>
                            <div className="filler-component-description">
                                <span>Tap into the cryptocurrency market to trade Bitcoin, Ethereum, and more, 24/7.</span>
                            </div>
                            <div className="filler-component-learn">
                                <span>Learn about crypto</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="manual-div">   
                <div className="manual-holder">
                    <div className="manual-holder-holder">
                        <div className="manual-image-div">
                            <div className="manual-image-holder">
                                <img src={window.whitePhone} alt="whtie-phone" className="white-phone"/>
                            </div>
                        </div>
                        <div className="manual-content-div">
                            <div className="manual-content-holder">
                                <div className="manual-content-title">
                                    <h1>No Manual Needed</h1>  
                                </div>
                                <span className="manual-content-description">
                                    Intuitively designed for newcomers and experts alike, BetterCapital gives you a clear picture of your portfolio's performance over time, so you can adjust your positions and learn by doing
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="next-div">
                <div className="next-holder">
                    <div className="next-holder-holder">
                        <div className="next-holder-holder-div">
                            <div className="next-component-div">
                                <div className="next-img-div">
                                    <div className="next-img-holder">
                                        <img src={window.manyPhones} alt="many-phones" className="many-phones" />
                                    </div>
                                </div>
                                <div className="next-content-div">
                                    <div className="next-content-holder">
                                        <div className="next-content-title">
                                            <h1>Next Level Investing</h1>
                                        </div>
                                        <div className="next-content-description">
                                            <span>
                                                Access professional research reports, trade on margin, and make bigger instant deposits with BetterCapital Gold--all starting at $5 a month.
                                            </span>
                                        </div>
                                        <div className="next-learn-more">
                                            <a href=""></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
};

export default Splash;