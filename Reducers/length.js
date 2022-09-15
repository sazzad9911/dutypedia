const initialState=0
const length=(state= initialState, action)=>{
    if(action.type ==='SET_LENGTH'){
        return action.playload
    }
    return state
}
export default length