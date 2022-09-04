import {combineReducers,createStore} from 'redux'
import bottomSheet from './Reducers/bottomSheet';
import bottomRef from './Reducers/bottomRef';
import allData from './Reducers/allData';

const combine=combineReducers({
    bottomSheet:bottomSheet,
    bottomRef:bottomRef,
    allData:allData,
})
const store=createStore(combine)
export default store