let initialState =-1

const bottomSheet=(state=initialState,action) => {
    if(action.type ==='SET_BOTTOM_SHEET'){
        return state=action.playload
    }
    return state
}
export default bottomSheet