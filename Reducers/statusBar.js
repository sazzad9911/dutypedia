const initialState={
    backgroundColor:"#ffffff",
    barStyle:"dark-content",
    hidden:false
}
const statusBar=(state=initialState,action)=>{
    if(action.type=="SET_COLOR"){
        return state={
            backgroundColor:action.playload.backgroundColor,
            barStyle:action.playload.barStyle,
            hidden:action.playload.hidden
        }
    }
    return state
}
export default statusBar

export const setStatusBar=(backgroundColor,barStyle,hidden)=>{
    return{
        type:"SET_COLOR",
        playload:{
            backgroundColor:backgroundColor,
            barStyle:barStyle,
            hidden:hidden?true:false
        }
    }
}