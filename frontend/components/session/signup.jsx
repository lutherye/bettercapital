import React from 'react';

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
            // .then(() => this.props.history.push('/home'));
    }

    render(){
        return (
            <div className="signup-form">
                <h2>Sign Up</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>First Name:
                            <input type="text"
                                value={this.state.first_name}
                                onChange={this.update("first_name")}
                            />
                        </label>
                        <label>Last Name:
                            <input type="text"
                                value={this.state.last_name}
                                onChange={this.update("last_name")}
                            />
                        </label>
                        <label>Email:
                            <input type="text"
                                value={this.state.email}
                                onChange={this.update("email")}
                            />
                        </label>
                        <label>Password:
                            <input type="text"
                                value={this.state.password}
                                onChange={this.update("password")}
                            />
                        </label>
                        <input type="submit" value="Continue"/>
                    </form>
            </div>
        )
    }
}

export default Signup;