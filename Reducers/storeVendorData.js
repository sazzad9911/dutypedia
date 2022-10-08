const initialState=null;
const storeVendorData=(state= initialState, action)=>{
    if(action.type=='SET_STORE_VENDOR_DATA'){
        return action.playload
    }
    return state
}
export default storeVendorData