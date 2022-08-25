import {combineReducers,createStore} from 'redux'
import bottomSheet from './Reducers/bottomSheet';
import bottomRef from './Reducers/bottomRef';

const combine=combineReducers({
    bottomSheet:bottomSheet,
    bottomRef:bottomRef
})
const store=createStore(combine)
export default store