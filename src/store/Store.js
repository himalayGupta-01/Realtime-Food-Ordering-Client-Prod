import {applyMiddleware, createStore} from 'redux'
import rootReudcer from "../reducers/Reducer";
import thunk from 'redux-thunk'


const store=createStore(rootReudcer,applyMiddleware(thunk));

export default store

