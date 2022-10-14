const initialState=false
const isDark=(state= initialState, action)=>{
    if(action.type=='SET_THEME'){
        return action.playload
    }
    return state
}
export default isDark