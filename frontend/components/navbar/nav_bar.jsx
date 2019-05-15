import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Search from '../navbar/search';


const mdp = dispatch => {
    return({
        logout: () => dispatch(logout()),
    });
};

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
            isFocused: false,
        };
        this.logoutHandle = this.logoutHandle.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.dropdownRemove = this.dropdownRemove.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    logoutHandle() {
            this.props.logout();
            this.props.history.push("/");
    }

    dropdown() {
        let myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains("show")) {
            myDropdown.classList.remove("show");
        } else {
            myDropdown.classList.toggle("show");
        }
    }

    dropdownRemove() {
        let myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains("show")) {
            myDropdown.classList.remove("show");
        }
    }

    handleInput(e) {
        this.setState({ value: e.target.value });
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
                            <div
                                tabIndex="1"
                                onFocus={this.dropdown}
                                onBlur={this.dropdownRemove}
                            >
                                <div className="home-home"
                                >
                                    <span className="dropdown-home-link">Account</span>
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
                                                        {"$" + (Math.round(this.props.currentUser.buying_power * 100) / 100).toFixed(2)}
                                                    </div>
                                                    <div>
                                                        Buying Power
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