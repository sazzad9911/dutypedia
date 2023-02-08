import { url } from "../action";
import axios from "axios";

export const updateData=async(token,data)=>{
    const res=await axios.put(`${url}/server/services/update`,data,{
        headers: { Authorization: `Bearer ${token}` },
    })
 return res
}
export const updateGigsData=async(token,data)=>{
    const res=await axios.put(`${url}/server/services/update/gig`,data,{
        headers: { Authorization: `Bearer ${token}` },
    })
 return res
}
export const updateUserData=async(token,data)=>{
    const res=await axios.put(`${url}/server/auth/profile/update`,data,{
        headers: { Authorization: `Bearer ${token}` },
    })
 return res
}