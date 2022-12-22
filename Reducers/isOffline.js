const initialState=false;
const isOffline=(state=initialState,action)=>{
    if(action.type=="SET_IS_OFFLINE"){
        return action.playload;
    }
    if(action.type=="TOGGLE_IS_OFFLINE"){
        return (!state)
    }
    return state;
}

export default isOffline

export const setIsOnline=(value)=>{
    return{
        playload:value,
        type:"SET_IS_OFFLINE"
    }
}
export const toggleIsOnline=()=>{
    return{
        playload:null,
        type:"TOGGLE_IS_OFFLINE"
    }
}