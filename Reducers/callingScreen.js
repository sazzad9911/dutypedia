const initialState=false;
const callingScreen=(state=initialState,action)=>{
    if(action.type=="SET_CALLING_SCREEN"){
        return action.playload
    }
    return state
}
export default callingScreen
export const setCallingScreen=(value)=>{
    return{
        type:"SET_CALLING_SCREEN",
        playload:value
    }
}