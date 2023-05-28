const initialState=null
const businessForm=(state= initialState, action)=>{
    if(action.type=='SERVICE_CENTER_NAME'){
        return {...state,'serviceCenterName':action.playload}
    }
    if(action.type=='SERVICE_CATEGORY'){
        return {...state,'serviceCategory':action.playload}
    }
    if(action.type=='TITLE'){
        return {...state,'title':action.playload}
    }
    if(action.type=='NAME'){
        return {...state,'name':action.playload}
    }
    if(action.type=='GENDER'){
        return {...state,'gender':action.playload}
    }
    if(action.type=='POSITION'){
        return {...state,'position':action.playload}
    }
    if(action.type=='TEAM_NUMBER'){
        return {...state,'teamNumber':action.playload}
    }
    if(action.type=='START_DATE'){
        return {...state,'startDate':action.playload}
    }
    if(action.type=='WORKING_TIME'){
        return {...state,'workingTime':action.playload}
    }
    if(action.type=='PRICE'){
        return {...state,'price':action.playload}
    }
    if(action.type=='FACILITIES'){
        return {...state,'facilities':action.playload}
    }
    if(action.type=='SERVICE_TITLE'){
        return {...state,'serviceTitle':action.playload}
    }
    if(action.type=='SKILLS'){
        return {...state,'skills':action.playload}
    }
    if(action.type=='KEYWORD'){
        return {...state,'keyword':action.playload}
    }
    if(action.type=='DESCRIPTION'){
        return {...state,'description':action.playload}
    }
    if(action.type=='ABOUT'){
        return {...state,'about':action.playload}
    }
    if(action.type=='FIRST_IMAGE'){
        return {...state,'firstImage':action.playload}
    }
    if(action.type=='SECOND_IMAGE'){
        return {...state,'secondImage':action.playload}
    }
    if(action.type=='THIRD_IMAGE'){
        return {...state,'thirdImage':action.playload}
    }
    if(action.type=='FOURTH_IMAGE'){
        return {...state,'forthImage':action.playload}
    }

    if(action.type=='DIVISION'){
        return {...state,'division':action.playload}
    }
    if(action.type=='DISTRICT'){
        return {...state,'district':action.playload}
    }
    if(action.type=='AREA'){
        return {...state,'area':action.playload}
    }
    if(action.type=='ADDRESS'){
        return {...state,'address':action.playload}
    }
    if(action.type=='SET_NEW_DATA'){
        return state=action.playload
    }
    return state
}
export default businessForm