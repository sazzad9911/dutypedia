import axios from "axios";
import { url } from "../action";

export const createConversation=async(token,username,serviceId)=>{
    //console.log(username)
    const res=await axios.post(`${url}/server/chat/conversation/create`,{
        username:username,
        serviceId:serviceId
    },{
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
export const getConversationVendor=async(token,serviceId)=>{
    const res=await axios.get(`${url}/server/chat/conversation/get-by-service/${serviceId}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res
}
export const searchUserByName=async(token,name)=>{
    const res=await axios.get(`${url}/server/chat/search/service?name=${name}`,{
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
export const getMessageUnReadCount=async(token,conversationId)=>{
    //console.log(`${url}/server/chat/messages/count-unread/${conversationId}`)
    //console.warn(token)
    const res=await axios.get(`${url}/server/chat/messages/count-unread/${conversationId}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res
}
export const seenMessage=async(token,messageId)=>{
    const res=await axios.put(`${url}/server/chat/messages/seen/${messageId}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res
}