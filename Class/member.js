import axios from 'axios';
import {url} from '../action'

export const getOfflineMembers=async(token,id)=>{
    const res= await axios.get(`${url}/server/members/offline?serviceId=${id}`,{
        headers:{ Authorization: `Bearer ${token}`}
    });
    if(res.data){
        return res.data
    }
    console.warn(res)
    return false;
}
export const createOfflineMembers=async(token,id,data)=>{
    if(!data.name){
        console.warn('Name is required to create members')
        return false
    }
    if(!data.phone){
        console.warn('Phone is required to create members')
        return false
    }
    if(!data.gender){
        console.warn('Gender is required to create members')
        return false
    }
    //console.log(token)
    //console.log(id)
    const res= await axios.post(`${url}/server/members/offline/create`,{
        serviceId:id,
        name:data.name,
        phone:data.phone,
        gender:data.gender,
        region:data.region?data.region:null,
        city:data.city?data.city:null,
        area:data.area?data.area:null,
        address:data.address?data.address:null,
        profilePhoto:data.profilePhoto?data.profilePhoto:null,
        wallPhoto:data.wallPhoto?data.wallPhoto:null,
    },{
        headers:{ Authorization: `Bearer ${token}`}
    })

    if(res){
        return res
    }
    console.warn(res)
    return false
}
export const deleteOfflineMember=async(token,id)=> {
    const res = await axios.delete(`${url}/server/members/offline/delete/${id}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    if(res){ return res }
    console.warn(res)
    return false
}
export const updateOfflineMembers=async(token,data)=>{
    if(!data.name){
        console.warn('Name is required to create members')
        return false
    }
    if(!data.phone){
        console.warn('Phone is required to create members')
        return false
    }
    if(!data.gender){
        console.warn('Gender is required to create members')
        return false
    }
    //console.log(token)
    //console.log(id)
    const res= await axios.put(`${url}/server/members/offline/update`,data,{
        headers:{ Authorization: `Bearer ${token}`}
    })

    if(res){
        return res
    }
    console.warn(res)
    return false
}
export const getRandomUser=async(token,serviceId)=>{
    const res= await axios.get(`${url}/server/members/online/get-random-users?serviceId=${serviceId}`,{
        headers:{ Authorization: `Bearer ${token}`}
    })
    if(res.data){ return res.data }
    
    return res
}
export const getUserByName = async(token, name,serviceId) =>{
    const res = await axios.get(`${url}/server/members/online/get-users-by-name?name=${name}&&serviceId=${serviceId}`,{
        headers: { Authorization: `Bearer ${token}` }
    });
    if(res.data){ return res.data }
    return res
}
export const createOnlineUser=async(token,userId,serviceId)=>{
   const res =await axios.post(`${url}/server/members/online/create`,{
        userId:userId,
        serviceId:serviceId
    },{
        headers: {Authorization: `Bearer ${token}`}
    })
    return res
}
export const getOnlineUser=async(token,serviceId) => {
    const res= await axios.get(`${url}/server/members/online?serviceId=${serviceId}`,{
        headers: {Authorization: `Bearer ${token}`}
    })
    if(res){ return res.data}
    console.warn(res.response.data.msg)
    return false
}
export const deleteOnlineMember=async(token,id) => {
    const res = await axios.delete(`${url}/server/members/online/delete/${id}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    if(res){ return res }
    console.warn(res)
    return false
}
export const getUserInfo=async(token,userId)=>{
    const res=axios.get(`${url}/server/auth/get-user?id=${userId}`,{
        headers:{ Authorization: `Bearer ${token}` }
    })
    return res
}
export const cancelOnlineUser=async(token,userId,serviceId)=>{
    const res =await axios.post(`${url}/server/members/online/undo`,{
         userId:userId,
         serviceId:serviceId
     },{
         headers: {Authorization: `Bearer ${token}`}
     })
     return res
 }