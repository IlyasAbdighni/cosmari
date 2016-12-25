import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

export const store = () => {
  const newStore = createStore(null, {}, applyMiddleware(ReduxThunk));
  return newStore;
};
