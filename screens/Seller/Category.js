import React from "react";
import { ScrollView } from "react-native";
import MainCategoryCart from "./../../Cart/Seller/MainCategoryCart";
import {
  BuilderIcon,
  BusinessServiceIcon,
  CookerIcon,
  ElectricIcon,
  EntertainmentIcon,
  HouseKeeperIcon,
  ItIcon,
  MusicIcon,
  OnlineTutionIcon,
  PainterIcon,
  SaloonIcon,
  RentIcon,
} from "../../assets/icon";

const Category = (props) => {
  const DATA = [
    {
      title: "Builder Services",
      icon: BuilderIcon,
      color:'#FF9C68'
    },
    {
        title: "Business Services",
        icon: BusinessServiceIcon,
        color:'blue'
    },
    {
        title: "Cooking Services",
        icon: CookerIcon,
        color:'#ED488B'
    },
    {
        title: "Electrician & Mechanician",
        icon: ElectricIcon,
        color:'#FFB800'
    },
    {
        title: "Entertainment",
        icon: EntertainmentIcon,
        color:'#8E4DD5'
    },
    {
        title: "House Keeper",
        icon: HouseKeeperIcon,
        color:'#FF4155'
    },
    {
        title: "It & Technology",
        icon: ItIcon,
        color:'#2381FF'
    },
    {
        title: "Music & Audio Service",
        icon: MusicIcon,
        color:'#FEB944'
    },
    {
        title: "Online Tution",
        icon: OnlineTutionIcon,
        color:'#FBB540'
    },
    {
        title: "Painter",
        icon: PainterIcon,
        color:'#D934BF'
    },
    {
        title: "Parlour & Saloon",
        icon: SaloonIcon,
        color:'#FF5364'
    },
    {
        title: "Labor",
        icon: RentIcon,
        color:'#61AFF6'
    }
  ];
  return (
    <ScrollView>
    {
        DATA.map((data,i) =>(
            <MainCategoryCart key={i} 
            title={data.title}
             icon={data.icon} 
             {...props}
             color={data.color} />
        ))
    }
    </ScrollView>
  );
};

export default Category;
