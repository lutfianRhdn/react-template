import {AuthReducer} from "./AuthReducer";
import {ActionReducer} from "./ActionReducer";
import {combineReducers} from 'redux'
const reducers =combineReducers({
     auth:AuthReducer,
     action:ActionReducer,
}) 
export default reducers