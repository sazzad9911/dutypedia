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
    const res=axios.delete(`${url}/server/notes/delete/${id}`,{
        headers: { Authorization: `Bearer ${token}`}
    })
    return res
}
export const setNoteNotification=async(token,date,time,serviceId,noteId)=>{
    const res=axios.post(`${url}/server/notes/set-notification`,{
        date:date,
        time:time,
        serviceId:serviceId,
        noteId:noteId
    },{
        headers: { Authorization: `Bearer ${token}`}
    })
    return res
}
export const unSetNotification=async(token,noteId)=>{
    const res=axios.post(`${url}/server/notes/remove-notification`,{
        noteId:noteId
    },{
        headers: { Authorization: `Bearer ${token}`}
    })
    return res
}