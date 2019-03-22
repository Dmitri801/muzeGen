import {createStore, } from "redux";
import rootReducer from "./reducers";

const initialState = {};


const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// Mount it on the store
const store = createStore(rootReducer, initialState, reduxDevTools)



export default store;