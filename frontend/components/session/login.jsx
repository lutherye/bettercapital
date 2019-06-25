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
        this.handleDemo = this.handleDemo.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
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
    
    handleDemo(e) {
        e.preventDefault();
        const demo = Object.assign({}, {email:"aaa@aaa.com", password:"password"});
        this.props.login(demo)
        .then(() => this.props.history.push('/'));
    }

    renderErrors() {
        return(
            this.props.errors.map((error, idx) => {
                return <span key={idx}><i className="fas fa-exclamation-circle"></i> {error} </span>
            })
        )
    }

    render(){
        return(
            <div className="login-page">
            <img src={window.loginPicture} 
                alt="login-splash-art"
                className="login-splash"
            />
                    <div className="login-logo-link"> 
                        {/* <Link to={"/home"}
                            className="logo-link">
                            BetterCapital
                        </Link> */}
                    </div>
                <main className="form-wrapper">
                <div className="login-form">

                    <h2 className="welcome">Welcome to BetterCapital</h2>
                    <form onSubmit={this.handleSubmit}>

                        <div className="login-label">Email or Username</div>
                                <input className="login-email" type="email"
                                value={this.state.email}
                                onChange={this.update("email")}
                                required="required"
                            />

                            <div className="login-label">Password</div>
                                <input className ="login-email" type="password"
                                value={this.state.password}
                                onChange={this.update("password")}
                                required="required"
                            />

                            <div className="switch-label">
                                <Link className="sign-link" to={"/signup"}>Sign up</Link>
                            </div>
                            <div>
                            </div>
                            <strong className="login-errors">
                                {this.renderErrors()}
                            </strong>
                        <br/>
                        <div className="login-button">
                         <input className="login-submit" type="submit" value="Log In" />
                            or use our
                                <Link to={"/"} className="demo-link" onClick={this.handleDemo}>DEMO</Link>
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