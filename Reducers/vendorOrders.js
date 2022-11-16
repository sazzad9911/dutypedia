const initialState=null
const vendorOrders=(state=initialState,action)=>{
    if(action.type=="VENDOR_ORDERS"){
        return action.playload
    }
    return state
}
export default vendorOrders