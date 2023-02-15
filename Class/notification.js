import axios from 'axios';
import {url} from '../action'

export const getUnreadCount=async(token)=>{
    const  res=await axios.get(`${url}/server/notification/get-unread-count`,
       { headers: { Authorization: `Bearer ${token}`}
    });
    return res
}
export const getUnreadNotification=async(token)=>{
    const  res=await axios.get(`${url}/server/notification/get-unread-notifications`,
       { headers: { Authorization: `Bearer ${token}`}
    });
    return res
}
export const getNotification=async(token)=>{
    const  res=await axios.get(`${url}/server/notification/get-notifications`,
       { headers: { Authorization: `Bearer ${token}`}
    });
    return res
}
export const getVendorNotification=async(token,serviceId)=>{
    const  res=await axios.get(`${url}/server/notification/get-vendor-notifications?serviceId=${serviceId}`,
       { headers: { Authorization: `Bearer ${token}`}
    });
    return res
}
export const getVendorNotificationCount=async(token,serviceId)=>{
    const  res=await axios.get(`${url}/server/notification/get-vendor-unread-count?serviceId=${serviceId}`,
       { headers: { Authorization: `Bearer ${token}`}
    });
    return res
}
export const getVendorUnreadNotification=async(token,serviceId)=>{
    const  res=await axios.get(`${url}/server/notification/get-vendor-unread-notifications?serviceId=${serviceId}`,
       { headers: { Authorization: `Bearer ${token}`}
    });
    return res
}