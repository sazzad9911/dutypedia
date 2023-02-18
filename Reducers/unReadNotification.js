const initialState=0;
const unReadNotification=(state=initialState,action)=>{
    if(action.type=="SET_UNREAD_NOTIFICATION"){
        return action.playload
    }
    return state
}
export default unReadNotification
export const storeNotificationCount=(value)=>{
    return{
        type:"SET_UNREAD_NOTIFICATION",
        playload:value
    }
}