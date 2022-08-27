export const setBottomSheet=(data)=>{
    return{
        type:'SET_BOTTOM_SHEET',
        playload:data
    }
}
export const bottomRef=(data)=>{
    return{
        type:'SET_BOTTOM_REF',
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