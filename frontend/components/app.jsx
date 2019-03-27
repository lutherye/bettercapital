import React from 'react';
import SignupContainer from './session/signup_container';
import { Route } from 'react-router-dom';
import Splash from './splash';

export default () => {
    return(
        <div>
            <Route exact path="/" component={Splash} />
            <Route exact path="/signup" component={SignupContainer} />
        </div>
    )
}