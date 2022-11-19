const initialState=[];

const packages=(state=initialState,action)=>{
    if(action.type=="SET_PACKAGES"){
        return state=action.playload
    }
    if(action.type=="ADD_PACKAGE"){
        return state= [...state,action.playload]
    }
    if(action.type=="DELETE_PACKAGE"){
        
        return state.filter(d=>d.id!=action.playload)
    }
    return state
}
export default packages