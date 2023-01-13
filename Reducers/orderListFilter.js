const initialState=null;

const orderListFilter=(state=initialState,action)=>{
    if(action.type=="SET_ORDER_LIST_FILTER"){
        return action.playload
    }
    return state
}
export default orderListFilter

export const setOrderListFilter=(value)=>{
    return{
        type:"SET_ORDER_LIST_FILTER",
        playload:value
    }
}