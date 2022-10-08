const initialState=null;
const interestCategory=(state= initialState, action)=>{
    if(action.type=='SET_INTEREST_CATEGORY'){
        return action.playload
    }
    return state
}
export default interestCategory