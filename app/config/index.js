import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

export const Store = () => {
  return createStore(reducers, {}, applyMiddleware(ReduxThunk));
};

export const BaseURl = 'https://cosmari.e-lios.eu/API/';
