import React from "react";
import { ScrollView,KeyboardAvoidingView } from "react-native";
import MainCategoryCart from "./../../Cart/Seller/MainCategoryCart";
import { useSelector, useDispatch } from "react-redux";
import BackHeader from "./../../components/BackHeader";

const Category = (props) => {
  const Data = useSelector((state) => state.allData);
  const [search,setSearch]= React.useState()
  const [allData,setAllData]=React.useState([])
  React.useEffect(() => {
    setAllData(Data)
  },[Data])
  const fromArray=(title,arr)=>{
    if(arr){
      return arr.filter(d=>d.title.match(title))
    }
    return []
  }
  return (
    <KeyboardAvoidingView style={{flex:1}}>
      <BackHeader value={search} onChange={(val)=>{
        setSearch(val)
        if(val) {
          let arr=Data.filter(d=>{
            if(d.title.match(val) || d.data&&fromArray(val,d.data).length>0 ||
            d.data&&d.data.data&&fromArray(val,d.data.data).length>0) {
              //console.log(fromArray(val,d.data).length);
              return d
            }
          })
          setAllData(arr)
        }else {
          setAllData(Data)
        }
      }} {...props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {allData.map((data, i) => (
          <MainCategoryCart
            onPress={() => {
              if (data.data) {
                props.navigation.navigate("SubCategories", {
                  title: data.title,
                  data: data.data,
                  image: data.image,
                  id:i
                });
              } else {
                props.navigation.navigate("TableData", {
                  title: data.title,
                  list: data.list,
                  exit:true, 
                  id:i
                });
              }
            }}
            key={i}
            title={data.title}
            icon={data.icon}
            {...props}
            color={data.color}
          />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Category;
