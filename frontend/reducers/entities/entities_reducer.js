import { combineReducers } from 'redux';
import assetsReducer from './assets_reducer';
import usersReducer from './users_reducer';


export default combineReducers({
    users: usersReducer,
    assets: assetsReducer,
});