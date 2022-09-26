import {url} from '../action'
import axios from 'axios'
import {localOptionsToServer} from '../Class/dataConverter'

export const createService=async(businessForm,listData,images,token,img1,img2)=>{
    const myHeaders=new Headers()
    //const formData=new FormData()
    let working=[]
    Array.isArray(businessForm.workingTime)
    &&businessForm.workingTime.forEach(doc=>{
        working.push({
            day:doc.title,
            open:doc.openingTime,
            close:doc.closingTime,
        })
    })
    myHeaders.append("Authorization", `Bearer ${token}`)
    const formData={
        "data":{
            "optionData":{
                "category":listData[0].mainTitle,
                "type":listData[0].subTitle?3:listData[0].title?2:1,
                "options":localOptionsToServer(listData)
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
                "workingTime":working,
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
 if(result&&!result.msg){
    return true
 }
 console.log(result)
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