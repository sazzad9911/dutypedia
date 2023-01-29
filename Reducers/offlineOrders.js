const initialState=null;
const offlineOrders=(state=initialState,action)=>{
    if(action.type=="SET_OFFLINE_ORDERS"){
        return action.playload
    }
    return state
}
export default offlineOrders

export const setOfflineOrders=(value)=>{
    return{
        type:"SET_OFFLINE_ORDERS",
        playload:value
    }
}