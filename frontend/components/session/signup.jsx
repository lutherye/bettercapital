import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    update(field){
        return (e) => {
            this.setState({[field]: e.target.value});
        };
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createUser(this.state)
            .then(() => this.props.history.push('/'));
    }

    renderErrors() {
        return (
            this.props.errors.map((error, idx) => {

                return <span key={idx}><i className="fas fa-exclamation-circle"></i> {error} </span>
            })
        )
    }
    render(){
        return (
            <div className="signup-page">
                <div className="right-space">
                    
                </div>

            <div className="signup-form-wrapper">
                <div className="signup-form">
                <nav className="signup-nav">
                    <Link className="logo-link" to={"/home"}>BetterCapital</Link>
                </nav>
                <div className="signup-header">
                    <h1 className="signup-h1">Make Your Money Move</h1>
                    <h2 className="signup-h2">BetterCapital lets you invest in companies you love, commission-free </h2>
                </div>
                        <form className="signup-inputs" onSubmit={this.handleSubmit}>
                        <div className="name-row">

                                <input className="input-signup signup-fname"
                                    required="required"
                                    type="text"
                                    value={this.state.first_name}
                                    onChange={this.update("first_name")}
                                    placeholder="First name"
                                />


                                <input className="input-signup signup-lname"
                                    required="required"
                                    type="text"
                                    value={this.state.last_name}
                                    onChange={this.update("last_name")}
                                    placeholder="Last name"
                                />
                            </div>

                        <div className="email-row">
                                <input className="input-signup"
                                    required="required"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.update("email")}
                                    placeholder="Email Address"
                                />
                        </div>
                        <div className="pass-row">
                                <input className="input-signup"
                                    required="required"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.update("password")}
                                    placeholder="Password(min. 6 characters)"
                                />
                        </div>
                            <strong className="login-errors">
                                {this.renderErrors()}
                            </strong>
                            <br />
                        <div className="continue-button">
                            <input className="signup-continue" type="submit" value="Continue"/>
                        </div>
                        <div className="already">
                            Already started?<Link className="already-link" to={"/login"}> Log in or use our DEMO</Link>
                        </div>
                        </form>

                </div>
            </div>
            </div>
        )
    }
}

export default Signup;