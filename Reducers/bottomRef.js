
const bottomRef=(state=null,action)=>{
    if(action.type=='SET_BOTTOM_REF'){
        return state=action.playload
    }
    return state
}
export default bottomRef