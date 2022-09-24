const initialState=null
const user=(state=initialState, action)=>{
    if(action.type=='SET_USER'){
        return action.playload
    }
    return state
}
export default user