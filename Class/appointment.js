import axios from "axios";
import { url } from "../action";

const createAppointment=async(token,serviceId,date,startTime,endTime,title,description,updateDate)=>{
    const res=axios.post(`${url}/server/appointment/create`,{
        serviceId:serviceId,
        date:date,
        startTime,
        endTime:endTime,
        title:title,
        description:description,
        updateDate:updateDate
    },{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const deleteAppointment=async(token,appointmentId)=>{
    const res=axios.put(`${url}/server/appointment/delete`,{
       appoId:appointmentId
    },{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const createOnlineAppointment=async(token,serviceId,date,startTime,endTime,title,description,memberId,updateDate)=>{
    const res=axios.post(`${url}/server/appointment/create/online`,{
        serviceId:serviceId,
        date:date,
        startTime,
        endTime:endTime,
        title:title,
        description:description,
        memberId:memberId,
        updateDate:updateDate
    },{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const createOfflineAppointment=async(token,serviceId,date,startTime,endTime,title,description,memberId)=>{
    const res=axios.post(`${url}/server/appointment/create/offline`,{
        serviceId:serviceId,
        date:date,
        startTime,
        endTime:endTime,
        title:title,
        description:description,
        memberId:memberId
    },{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const getAppointment=async(token,type,serviceId)=>{
    //console.log(`${url}/server/appointment/get/${type.toLowerCase()}?serviceId=${serviceId}`)
    const res=axios.get(`${url}/server/appointment/get/${type.toLowerCase()}?serviceId=${serviceId}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const changeAppointment=async(token,appointmentId,status)=>{
    const res=axios.put(`${url}/server/appointment/change-status`,{
        appointmentId:appointmentId,
        status:status
    },{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const getVendorAppointment=async(token,type,serviceId)=>{
    //console.log(`${url}/server/appointment/get/${type.toLowerCase()}?serviceId=${serviceId}`)
    const res=axios.get(`${url}/server/appointment/get/${type.toLowerCase()}/vendor?serviceId=${serviceId}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const getUserAppointment=async(token,type,serviceId)=>{
    //console.log(`${url}/server/appointment/get/${type.toLowerCase()}?serviceId=${serviceId}`)
    const res=axios.get(`${url}/server/appointment/get/${type.toLowerCase()}/user?userId=${serviceId}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
const getAppointmentById=async(token,appointmentId)=>{
    const res=axios.get(`${url}/server/appointment/get-by-id/${appointmentId}`,{
        headers:{Authorization: `Bearer ${token}`}
    })
    return res
}
export {createAppointment,
    getAppointment,
    changeAppointment,
    createOnlineAppointment,
    createOfflineAppointment,
    getVendorAppointment,
    getUserAppointment,
    deleteAppointment,
    getAppointmentById
}