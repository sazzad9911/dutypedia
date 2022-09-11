export const setBottomSheet=(data)=>{
    return{
        type:'SET_BOTTOM_SHEET',
        playload:data
    }
}
export const setAllData=(data,i)=>{
    return{
        type:'SET_DATA',
        playload:data
    }
}
export const setArrayReplaceData=(data,i)=>{
    return{
        type:'SET_ARRAY_REPLACE',
        playload:data,
        index:i,
    }
}
export const setArrayReplaceData2=(data,i,id)=>{
    return{
        type:'SET_ARRAY_REPLACE_2',
        playload:data,
        index:i,
        nextId:id,
    }
}
export const setListReplace1=(data,id,nextId,lastId,listId) => {
    return{
        type: 'SET_LIST_REPLACE_1',
        playload:data,
        id:id,
        nextId:nextId,
        lastId:lastId,
        listId:listId
    }
}
export const setListReplace2=(data,id,nextId,listId) => {
    return{
        type: 'SET_LIST_REPLACE_2',
        playload:data,
        id:id,
        nextId:nextId,
        listId:listId
    }
}
export const setListReplace3=(data,id,listId) => {
    return{
        type: 'SET_LIST_REPLACE_3',
        playload:data,
        id:id,
        listId:listId
    }
}
export const bottomRef=(data)=>{
    return{
        type:'SET_BOTTOM_REF',
        playload:data
    }
}
export const setListData=(data)=>{
    return{
        type:'SET_DATA',
        playload:data
    }
}
export const numToArray=(integer)=>{
    let number=parseInt(integer)
    let arr=[]
    let i=0;
    while(i<=number){
        arr.push(i)
        i++
    }
    return arr
}