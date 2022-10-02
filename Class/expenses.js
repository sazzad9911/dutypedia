import axios from "axios";
import { url } from "../action";

export const createExpenses = async (token,data) => {
    const res= await axios.post(`${url}/server/expenses/create`,data,{
        headers:{ Authorization: `Bearer ${token}`}
    });
    if(res){ return res.data}
    console.warn(res.response.data.msg);
    return false;
};
export const getExpenses=async(token,serviceId) =>{
    const res=await axios.get(`${url}/server/expenses/get?serviceId=${serviceId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
    if(res){ return res.data}
    console.warn(res.response.data.msg);
    return false;
}
export const deleteExpenses=async(token,id) =>{
    const res=await axios.delete(`${url}/server/expenses/delete/${id}`,{
        headers:{ Authorization: `Bearer ${token}`}
    })
    if(res){ return res.data}
    console.warn(res.response.data.msg);
    return false;
}
export const updateExpenses=async(token,data)=>{
    const res=await axios.put(`${url}/server/expenses/update`,data,{
        headers:{ Authorization: `Bearer ${token}`}
    })
    if(res){ return res.data}
    console.warn(res.status)
    return false
}