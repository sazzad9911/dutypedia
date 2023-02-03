import { url } from "../action";
import axios from "axios";

export const updateData=(token,data)=>{
    const res=axios.put(`${url}/server/services/update`,data,{
        headers: { Authorization: `Bearer ${token}` },
    })
 return res
}
export const updateGigsData=(token,data)=>{
    const res=axios.put(`${url}/server/services/update/gig`,data,{
        headers: { Authorization: `Bearer ${token}` },
    })
 return res
}