const initialState=null;

const socket=(state=initialState,action)=>{
    if(action.type=="SET_SOCKET"){
        return action.playload;
    }
    return state
}
export default socket