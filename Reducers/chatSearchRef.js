const initialState=null;
const chatSearchRef=(state=initialState,action)=>{
    if(action.type=="SET_CHAT_SEARCH_REF"){
        return action.playload;
    }
    return state
}
export default chatSearchRef

export const setChatSearchRef=(value)=>{
    return{
        type:"SET_CHAT_SEARCH_REF",
        playload:value
    }
}