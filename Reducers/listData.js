const initialState=[];
const listData=(state= initialState, action)=>{
    if(action.type=='SET_DATA'){
        return state=action.playload
    }
    return state
}
export default listData