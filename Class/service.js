import {url} from '../action'
import axios from 'axios'

export const createService=async(businessForm,listData,images,token,img1,img2)=>{
    const myHeaders=new Headers()
    //const formData=new FormData()
    myHeaders.append("Authorization", `Bearer ${token}`)
    const formData={
        "data":{
            "optionData":{
                "category":listData[0].mainTitle,
            },
            "dashboard":listData[0].mainTitle,
            "uploadServiceData":{
                "about":businessForm.about,
                "speciality":businessForm.speciality,
                "title":businessForm.title,
                "description":businessForm.description
            },
            "selectServiceData":{
                "serviceName":businessForm.serviceTitle,
                "providerTitle":businessForm.title,
                "providerName":businessForm.name,
                "gender":businessForm.gender,
                "position":businessForm.position,
                "worker":businessForm.teamNumber,
                "startDate":businessForm.startDate,
                "workingTime":Array.isArray(businessForm.workingTime)?businessForm.workingTime:[],
                "t47":false,
                "startingPrice":businessForm.price,
                "facilities":{
                    title:'Choose Your Facilities',
                    selectedOptions:Array.isArray(businessForm.facilities)?
                    businessForm.facilities.filter(data=>data.checked==true):[]
                },
            },
            "serviceLocationData":{
                "state":businessForm.division,
                "city":businessForm.district,
                "area":businessForm.area,
                "address":businessForm.address
            }
        },
        "serviceImages":images,
        "profilePhotoUrl":img1,
        "wallPhotoUrl":img2,

    }
    const options={
        method: 'POST',
        headers: myHeaders,
        body:formData
    }
  const result = await fetch(`${url}/server/services/create`,options)
 if(result){
    return true
 }
  return false;
}
export const getService=async(token)=>{
   const myHeaders=new Headers()
    //const formData=new FormData()
    myHeaders.append("Authorization", `Bearer ${token}`)
    const options={
        method: 'GET',
        headers: myHeaders,
    }
  const result = await fetch(`${url}/server/services/get`,options)
 if(result){
    return result.json()
 }
  return false;
}
export const getGigs=async(token,id) => {
    const myHeaders=new Headers()
    //const formData=new FormData()
    myHeaders.append("Authorization", `Bearer ${token}`)
    const options={
        method: 'GET',
        headers: myHeaders,
    }
  const result = await fetch(`${url}/server/services/get/gigs/${id}/STARTING`,options)
 if(result){
    return result.json()
 }
  return false;
}