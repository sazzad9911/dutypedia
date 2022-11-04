const initialState=[];
const orders=(state=initialState,action)=>{
    if(action.type=="SET_ORDERS"){
        return action.playload
    }
    return state
}
export default orders