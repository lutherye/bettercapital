import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state)
        .then(() => this.props.history.push('/'));
    }

    render(){
        return(
            <div className="login-page">
                <div className="login-splash">

                </div>
                <main className="form-wrapper">
                <div className="login-form">

                    <h2 id="welcome">Welcome to BetterCapital</h2>
                    <form onSubmit={this.handleSubmit}>

                        <div id="login-label">Email or Username</div>
                                <input id="login-email" type="email"
                                value={this.state.email}
                                onChange={this.update("email")}
                            />

                            <div id="login-label">Password</div>
                                <input id ="login-email" type="password"
                                value={this.state.password}
                                onChange={this.update("password")}
                            />

                            <div id="switch-label">
                                <Link to={"/signup"}>Sign up</Link>
                            </div>
                        <br/>
                        <div className="login-button">
                         <input id ="login-submit" type="submit" value="Log In" />
                        </div>
                    </form>
                </div>
               <br/>
               </main>      
            </div>
        )
    }

    
}

export default Login;