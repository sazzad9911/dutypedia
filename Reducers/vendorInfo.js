const initialState=null;
const vendorInfo=(state= initialState, action)=>{
    if(action.type ==='SET_VENDOR_INFO'){
        return action.playload
    }
    return state
}
export default vendorInfo