const initialState=false;
const orderRef=(state=initialState,action)=>{
    if(action.type==="SET_ORDER_REF"){
        return action.playload
    }
    return state
}
export default orderRef;
export const setOrderRef=(value)=>{
    return{
        type:"SET_ORDER_REF",
        playload:value?value:false
    }
}