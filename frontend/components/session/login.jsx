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
               <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>

                    <label>Email:
                            <input type="email"
                            value={this.state.email}
                            onChange={this.update("email")}
                        />
                    </label>
                    <label>Password:
                            <input type="password"
                            value={this.state.password}
                            onChange={this.update("password")}
                        />
                    </label>
                    <input type="submit" value="Continue" />
                </form>
               <br/>
               <Link to={"/signup"}>Sign up</Link>
               </div>      
        )
    }

    
}

export default Login;