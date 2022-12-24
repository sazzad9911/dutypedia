import { getData, getJson, storeData, storeJson } from "../Class/storage";

const initialState=null

const userOrders=(state=initialState,action)=>{
    if(action.type=="USER_ORDERS"){
        //storeData("USER_ORDERS",action.playload)
        return action.playload
    }
    if(action.type=="ADD_USER_ORDER"){
        //storeData("USER_ORDERS",[...state,action.playload])
        //setUserOrdersOffline([...state,action.playload])
        return [action.playload,...state]
    }
    if(action.type=="UPDATE_USER_ORDER"){
        let arr=[]
        state.forEach(doc=>{
            if(doc.id==action.playload.id){
                arr.push(action.playload)
            }else{
                arr.push(doc)
            }
        })
        //setUserOrdersOffline(arr)
        //storeData("USER_ORDERS",arr)
        return arr
    }
    //state= await getData("USER_ORDERS");
    return state
}
export default  userOrders

export const addUserOrder=(data)=>{
    return{
        type:"ADD_USER_ORDER",
        playload:data
    }
}
export const updateUserOrder=(data)=>{
    return{
        type:"UPDATE_USER_ORDER",
        playload:data
    }
}
export const getUserOrdersOffline=async()=>{
    const data=await getJson("USER_ORDERS")
    if(Array.isArray(data)){
        return data
    }
    setUserOrdersOffline(null)
    return null
}
export const setUserOrdersOffline=async(data)=>{
    const res=await storeJson("USER_ORDERS",data)
    return res
}