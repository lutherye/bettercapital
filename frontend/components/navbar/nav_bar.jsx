import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Search from '../navbar/search';


const mdp = dispatch => {
    debugger
    return({
        logout: () => dispatch(logout()),
    });
};

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.logoutHandle = this.logoutHandle.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.removeDrop = this.removeDrop.bind(this);
    }

    logoutHandle() {
            this.props.logout();
            this.props.history.push("/");
    }

    dropdown() {
        debugger
        let myDropdown = document.getElementById("myDropdown");
        debugger
        if (myDropdown.classList.contains("show")) {
            myDropdown.classList.remove("show");
            debugger
        } else {
            myDropdown.classList.toggle("show");
        }
    }

    removeDrop() {

    }

    render() {
        return (
            <header className="asset-header">
                <nav className="asset-nav">
                    <div className="login-nav-logo-link">
                        <Link to={"/home"}
                            className="logo-link">
                            BetterCapital
                            </Link>
                    </div>
                    <div className="asset-search">
                        <Search
                            props={this.props.symbol} />
                    </div>
                    <div className="home-button-wrapper">
                        <div className="home-button-div">
                            <div className="home-home">
                                <Link to={"/home"}
                                    className="home-link">
                                    Home
                                </Link>
                            </div>
                            <div className="home-home">
                                <Link to={"/home"}
                                    className="home-link">
                                    Notifications
                                </Link>
                            </div>
                            <div
                                tabIndex="1"
                                onFocus={this.dropdown}
                                onBlur={this.dropdown}
                            >
                                <div className="home-home"

                                >
                                    <span className="home-link">Account</span>
                                </div>
                                <div className="dropdown-div">
                                    <div className="">
                                        <div className="account-holder" 
                                            id="myDropdown"
                                        >
                                            <div className="number-holder">
                                                <div className="value-holder">
                                                    <div className="drop-port-val">
                                                        {"$" + (Math.round(this.props.portVal * 100) / 100).toFixed(2)}
                                                    </div>
                                                    <div>
                                                        Portfolio Value
                                                    </div>
                                                </div>
                                                <div className="buy-holder">
                                                    <div className="drop-port-val">
                                                        {"$" + this.props.currentUser.buying_power}
                                                    </div>
                                                    <div>
                                                        Buying Power
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bank-holder">
                                                <div>

                                                </div>
                                                <div className="word-holder">
                                                    <div className="deposit">
                                                        <span>Deposit Funds</span>
                                                    </div>
                                                </div>
                                                    <div className="makebelieve">
                                                        From 
                                                        <div className="bank-of">Makebelieve Bank</div>
                                                    </div>
                                                <div className="transaction-holder">
                                                    <div className="amount-words">
                                                        Amount
                                                    </div>
                                                    <input type="integer" className="buy-input"/>
                                                </div>
                                                    <div className="button-holder">
                                                        <div className="transfer-button">
                                                            Make Transfer
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="logout-section">
                                                <div className="asset-header-button"
                                                    onClick={this.logoutHandle}>Log Out</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default withRouter(connect(null, mdp)(NavBar));