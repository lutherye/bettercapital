import React from 'react';
import SignupContainer from './session/signup_container';
import { Route } from 'react-router-dom';
import Splash from './splash';
import LoginContainer from './session/login_container';
import GreetingContainer from './greetings/greeting_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

export default () => {
    return(
        <div>


            <Route exact path="/" component={GreetingContainer} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
        </div>
    )
}