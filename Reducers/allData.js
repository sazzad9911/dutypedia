import builder from '../assets/Images/builder.webp'
import uuid from 'react-native-uuid';
import { BuilderOptions } from './../Data/builder';
import {BuilderIcon} from '../assets/icon'
const initialState = [
  {
    title: "Builder Services",
    icon: BuilderIcon,
    color: "#FF9C68",
    image:builder,
    data:[
        {
            title: "Bridge Builder",
            list: [
              {
                title:'Bridge Builder',
                data:BuilderOptions.bridgebuilder
              }
            ]
        },
        {
            title: "Carpenter",
            list:[
              {
                title:'Carpenter',
                data:BuilderOptions.carpenter
              }
            ]
            
        }
    ]
  },
];
const allData=(state=initialState,action)=>{
  if(action.type === "SET_DATA"){
    return state=action.playload
  }
  return state
}
export default allData