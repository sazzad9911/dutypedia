import {combineReducers,createStore} from 'redux'
import bottomSheet from './Reducers/bottomSheet';
import bottomRef from './Reducers/bottomRef';
import allData from './Reducers/allData';
import listData from './Reducers/listData';
import length from './Reducers/length';
import businessForm from './Reducers/businessForm';

const combine=combineReducers({
    bottomSheet:bottomSheet,
    bottomRef:bottomRef,
    allData:allData,
    listData:listData,
    length:length,
    businessForm:businessForm,
})
const store=createStore(combine)
export default store