import { combineReducers } from 'redux';
import sessionReducer from './session';
import entitiesReducer from './entities/entities_reducer';


export default combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
});