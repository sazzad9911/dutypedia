const initialState=[];
const listData=(state= initialState, action)=>{
    if(action.type=='SET_DATA'){
        return state=action.playload
    }
    if(action.type=='ADD_DATA'){
        return [...state, action.playload]
    }
    if(action.type=='DELETE_DATA'){
        return state.filter(data=>data.data.id!=action.playload)
    }
    return state
}
export default listData