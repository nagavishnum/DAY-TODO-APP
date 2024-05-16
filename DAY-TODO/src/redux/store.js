import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { reducer } from './Reducer';

const initialState = {
    loading: false,
    date: null,
    error: null
  };
const store = createStore(reducer, applyMiddleware(thunk));


export { store, initialState };
