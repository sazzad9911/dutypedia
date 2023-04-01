const initialState=false;
const searchOrderRef=(state=initialState,action)=>{
    if(action.type==="SET_SEARCH_ORDER_REF"){
        return action.playload
    }
    return state
}
export default searchOrderRef;
export const setSearchOrderRef=(value)=>{
    return{
        type:"SET_SEARCH_ORDER_REF",
        playload:value
    }
}