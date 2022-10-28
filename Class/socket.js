import { io } from "socket.io-client";
const URL="http://185.211.6.223"
const socket=io(URL)

const connectSocket=()=>{
    socket.on("connect",()=>{
        console.log("socket connected")
    })
}

export {socket,connectSocket}