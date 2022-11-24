import axios from "axios";
import { url } from "../action";

const createAppointment=async(token,serviceId,date,startTime,endTime,title,description)=>{
    const res=axios.post(`${url}/server/appointment/create`,{
        serviceId:serviceId,
        date:date,
        startTime,
        endTime:endTime,
        title:title,
        description:description
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
export {createAppointment,getAppointment,changeAppointment}