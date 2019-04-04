import React from 'react';
import SignupContainer from './session/signup_container';
import { Route, witch } from 'react-router-dom';
import Splash from './splash';
import LoginContainer from './session/login_container';
import GreetingContainer from './greetings/greeting_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import AssetsContainer from '../components/assets/assets_container';


export default () => {
    return(
        <div>
            <ProtectedRoute exact path={`/asset/:symbol`} component={AssetsContainer} />
            <ProtectedRoute exact path="/home" component={GreetingContainer} />
            <AuthRoute exact path="/" component={Splash} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
        </div>
    )
}