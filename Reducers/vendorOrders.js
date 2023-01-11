import { getJson, storeJson } from "../Class/storage"

const initialState=null
const vendorOrders=(state=initialState,action)=>{
    if(action.type=="VENDOR_ORDERS"){
        return action.playload
    }
    if(action.type=="ADD_VENDOR_ORDERS"){
        //setVendorOrdersOffline([...state,action.playload])
        return [action.playload,...state]
    }
    if(action.type=="UPDATE_VENDOR_ORDERS"){
        let arr=[]
        if(state){
            state.forEach((doc,i)=>{
                if(doc.id==action.playload.id){
                    arr.push(action.playload)
                }else{
                    arr.push(doc)
                }
            })
        }else{
            arr.push(action.playload)
        }
        //setVendorOrdersOffline(arr)
        return arr
    }
    return state
}
export default vendorOrders

export const addVendorOrder=(data)=>{
    return{
        type:"ADD_VENDOR_ORDERS",
        playload:data
    }
}
export const updateVendorOrder=(data)=>{
    return{
        type:"UPDATE_VENDOR_ORDERS",
        playload:data
    }
}
export const getVendorOrdersOffline=async()=>{
    const data=await getJson("VENDOR_ORDERSs")
    if(Array.isArray(data)){
        return data
    }
    setVendorOrdersOffline(null)
    return null
}
export const setVendorOrdersOffline=async(data)=>{
    const res=await storeJson("VENDOR_ORDERSs",data)
    return res
}