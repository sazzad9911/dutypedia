const initialState =null;
const vendor=(state=initialState, action)=>{
    if(action.type ==='SET_VENDOR'){
        return action.playload
    }
    return state
}
export default vendor