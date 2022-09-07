const initialState=null
const listData=(state= initialState, action)=>{
    if(action.playload=='SET_DATA'){
        return state=action.playload
    }
    return state
}
export default listData