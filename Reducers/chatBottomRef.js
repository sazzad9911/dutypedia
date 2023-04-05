const initialState=null;
const chatBottomRef=(state=initialState,action)=>{
    if(action.type=="SET_CHAT_BOTTOM_REF"){
        return action.playload
    }
    return state;
}
export default chatBottomRef;
export const setChatBottomRef=(value)=>{
    return{
        type:"SET_CHAT_BOTTOM_REF",
        playload:value
    }
}