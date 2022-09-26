const initialState=[]
const newListData=(state= initialState, action)=>{
    if(action.type=='SET_NEW_LIST_DATA'){
        return action.playload
    }
    return state
}
export default newListData