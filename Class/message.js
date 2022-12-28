import axios from "axios";
import { url } from "../action";

export const createConversation=async(token,username)=>{
    const res=await axios.get(`${url}/chat/conversation/create?username${username}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res
}
export const getConversation=async()