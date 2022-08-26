

export const primaryColor='#ffffff'
export const secondaryColor='#fbfbfb'
export const textColor='#333333'
export const assentColor='#808080'
export const backgroundColor='rgba(0, 0, 0, 0.141)'

const color=(state={
    primaryColor:primaryColor,
    secondaryColor:secondaryColor,
    textColor:textColor,
    assentColor:assentColor,
    backgroundColor:backgroundColor
},action)=>{
    if(action.type === 'SET_COLOR'){
        return state=action.playload
    }
    return state
}
export default color