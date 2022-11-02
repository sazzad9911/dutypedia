
const initialState=null;
const orderSocket=(state=initialState,action)=>{
    if(action.type=="SET_ORDER_SOCKET"){
        return action.playload
    }
    return state
}
export default orderSocket