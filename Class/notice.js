import {url} from '../action'
import axios from 'axios'

export const createNotice=async(token,data)=>{
    const res= await axios.post(`${url}/server/notice/create`,data,{
        headers: { Authorization: `Bearer ${token}`}
    })
    if(res){ return res.data}
    console.warn(res.response.data)
    return false
}
export const getNotice=async(token,serviceId)=>{
    const res= await axios.get(`${url}/server/notice/get?serviceId=${serviceId}`,{
        headers: { Authorization: `Bearer ${token}`}
    })
    if(res){ return res.data}
    console.warn(res.response.data.msg)
    return false
}
export const deleteNotice=async(token,id)=>{
    const res= await axios.delete(`${url}/server/notice/delete/${id}`,{
        headers: { Authorization: `Bearer ${token}`}
    })
    if(res){ return res.data}
    console.warn(res.response.data.msg)
    return false
}
export const updateNotice=async(token,data)=>{
    const res= await axios.put(`${url}/server/notice/update`,data,{
        headers: { Authorization: `Bearer ${token}`}
    })
    return res
}