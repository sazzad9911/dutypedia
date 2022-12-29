import axios from "axios";
import { url } from "../action";

export const createConversation=async(token,username)=>{
    const res=await axios.get(`${url}/server/chat/conversation/create?username=${username}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res
}
export const getConversation=async(token)=>{
    const res=await axios.get(`${url}/server/chat/conversation/get-by-user`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res
}
export const searchUserByName=async(token,name)=>{
    const res=await axios.get(`${url}/server/chat/search/users?name=${name}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res;
}
export const sendMessage=async(token,text,image,conversationId)=>{
    const res=await axios.post(`${url}/server/chat/message/create`,{
        text:text,
        image:image,
        conversationId:conversationId
    },{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res
}