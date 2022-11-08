const initialState=[];

const userOrders=(state=initialState,action)=>{
    if(action.type=="USER_ORDERS"){
        return action.playload
    }
    return state
}
export default  userOrders