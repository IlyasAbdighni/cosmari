import { combineReducers } from 'redux';
import city from './AppReducers';
import routes from './routes';

export default combineReducers({
  city, routes
});
