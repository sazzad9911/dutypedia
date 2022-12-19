const initialState=false;
const hideBottomBar=(state=initialState,action)=>{
    if(action.type==="HIDE_BOTTOM_BAR"){
        return action.playload;
    }
    return state;
}
export default hideBottomBar

export const setHideBottomBar=(value)=>{
    return{
        type:"HIDE_BOTTOM_BAR",
        playload:value
    }
}