import axios from "axios";
import { url } from "../action";

export const getOnlineNotes=async(token,memberId,serviceId)=>{
    const  res=await axios.get(`${url}/server/notes/get?memberId=${memberId}&&serviceId=${serviceId}`,
       { headers: { Authorization: `Bearer ${token}`}
    });
    return res
}

export const getOfflineNotes=async(token,memberId,serviceId)=>{
    const  res=await axios.get(`${url}/server/notes/get/offline?memberId=${memberId}&&serviceId=${serviceId}`,
       { headers: { Authorization: `Bearer ${token}`}
    });
    return res
}
export const createOnlineNote=async(token,title,memberId,serviceId,description)=>{
    const res=axios.post(`${url}/server/notes/create`,{
        title:title,
        memberId:memberId,
        serviceId:serviceId,
        description:description
    },{
        headers: { Authorization: `Bearer ${token}`}
    })
    return res
}
export  const createOfflineNote=async(token,title,memberId,serviceId,description)=>{
    const res=axios.post(`${url}/server/notes/create/offline`,{
        memberId:memberId,
        serviceId:serviceId,
        title:title,
        description:description
    },{
        headers: { Authorization: `Bearer ${token}`}
    })
    return res
}
export const deleteNote=async(token,id)=>{
    const res=axios.put(`${url}/server/notes/delete/:noteId=${id}`,{
        headers: { Authorization: `Bearer ${token}`}
    })
    return res
}