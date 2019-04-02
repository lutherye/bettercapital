import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { ProtectedRoute, AuthRoute } from './util/route_util';
import { getChart } from './util/asset_util';
import { fetChart, fetSymbol } from './actions/asset_actions';

document.addEventListener("DOMContentLoaded", ()=>{
    const root = document.getElementById("root");

    //testing   
    //testing
    window.ProtectedRoute = ProtectedRoute;
    window.AuthRoute = AuthRoute;
    window.getChart = getChart;
    window.fetChart = fetChart;
    window.fetSymbol = fetSymbol;

    //testing
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
    window.store = store;
    ReactDOM.render(<Root store={store}/>, root)
})