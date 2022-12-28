import axios from "axios";
import { url } from "../action";

export const createConversation=async(token,username)=>{
    const res=await axios.post(`${url}/chat/conversation/create?username${username}`)
}