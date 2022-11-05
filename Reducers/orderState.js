const initialState=null;
const orderState=(state=initialState,action)=>{
    if(action.type=="ORDER_STATE"){
        return action.playload
    }
    return state
}
export default orderState