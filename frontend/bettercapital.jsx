import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { ProtectedRoute, AuthRoute } from './util/route_util';

document.addEventListener("DOMContentLoaded", ()=>{
    const root = document.getElementById("root");

    //testing   
    window.ProtectedRoute = ProtectedRoute;
    window.AuthRoute = AuthRoute;

    //testing
    let store;
    if (window.user) {
        const preloadedState = {
            entities: {
                users: { [window.user.id]: window.user }
            },
            session: { userId: window.user.id }
        };
        store = configureStore(preloadedState);
        delete window.user;
    } else {
        store = configureStore();
    }

    ReactDOM.render(<Root store={store}/>, root)
})