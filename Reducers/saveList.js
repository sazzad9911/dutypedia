const initialState=null;
const saveList=(state=initialState,action)=>{
    if(action.type=="SET_SAVE_LIST"){
        return action.playload
    }
    return state
}
export default saveList;

export const setSaveList=(value)=>{
    return{
        type:"SET_SAVE_LIST",
        playload:value
    }
}
