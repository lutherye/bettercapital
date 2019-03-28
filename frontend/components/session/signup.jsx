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

    render(){
        return (
            <div className="signup-page">
                <div className="right-space">
                    
                </div>

            <div className="signup-form-wrapper">
                <div className="signup-form">
                <nav className="signup-nav">
                    PEEPEE
                </nav>
                <div className="signup-header">
                    <h1 className="signup-h1">Make Your Money Move</h1>
                    <h2 className="signup-h2">BetterCapital lets you invest in companies you love, commission-free </h2>
                </div>
                        <form className="signup-inputs" onSubmit={this.handleSubmit}>
                        <div className="name-row">

                                <input className="input-signup signup-fname"

                                    type="text"
                                    value={this.state.first_name}
                                    onChange={this.update("first_name")}
                                    placeholder="First name"
                                />


                                <input className="input-signup signup-lname"

                                    type="text"
                                    value={this.state.last_name}
                                    onChange={this.update("last_name")}
                                    placeholder="Last name"
                                />
                            </div>

                        <div className="email-row">
                                <input className="input-signup"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.update("email")}
                                    placeholder="Email Address"
                                />
                        </div>
                        <div className="pass-row">
                                <input className="input-signup"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.update("password")}
                                    placeholder="Password(min. 6 characters)"
                                />
                        </div>
                        <div className="continue-button">
                            <input className="signup-continue" type="submit" value="Continue"/>
                        </div>
                        <div className="already">
                            <Link className="already-link" to={"/login"}>Already a user?</Link>
                        </div>
                        </form>

                </div>
            </div>
            </div>
        )
    }
}

export default Signup;