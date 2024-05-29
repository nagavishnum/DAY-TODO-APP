import { applyMiddleware, createStore } from "redux";
import reducer from "./RootReducer";
import {thunk} from 'redux-thunk';

export const store = createStore(reducer,applyMiddleware(thunk));
