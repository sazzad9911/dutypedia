import axios from "axios";
import { url } from "../action";

const getAllTransactions=async(token,serviceId,limit,skip)=>{
    const res=axios.get(`${url}/server/balance/get/transactions?serviceId=${serviceId}${limit?`&limit=${limit}`:``}${skip?`&skip=${skip}`:``}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const getAllWithdraws=async(token,serviceId)=>{
    const res=axios.get(`${url}/server/balance/get/withdraw?serviceId=${serviceId}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const getAccountInfo=async(token,serviceId)=>{
    const res=axios.get(`${url}/server/balance/get/account?serviceId=${serviceId}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const cancelWithdraw=async(token,serviceId,withdrawId)=>{
    const res=axios.put(`${url}/server/balance/cancel/withdraw?serviceId=${serviceId}&withdrawId=${withdrawId}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const requestWithdraw=async(token,serviceId,data)=>{
    const res=axios.put(`${url}/server/balance/request-withdraw`,{data},{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
export {requestWithdraw,cancelWithdraw,getAccountInfo,getAllWithdraws,getAllTransactions}