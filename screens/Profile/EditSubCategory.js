import React, { useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
} from "react-native";
import builder from "../../assets/Images/builder.webp";
import { textColor } from "./../../assets/colors";
import SubCategoryCart from "./../../Cart/Seller/SubCategoryCart";
import AddButton from "./../../components/AddButton";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setArrayReplaceData,
  setArrayReplaceData2,
  setListData,
} from "../../action";
import InputModal from "./../Seller/InputModal";
import IconButton from "../../components/IconButton";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import { useIsFocused } from "@react-navigation/native";
import { updateGigsData } from "../../Class/update";
import { localOptionsToServer, serverToLocal } from "../../Class/dataConverter";
import ActivityLoader from "../../components/ActivityLoader";
import { getService } from "../../Class/service";
import { uniq } from "../Vendor/AllService";

const EditSubCategory = ({ navigation, route }) => {
  const title = route.params.title;
  const params = route.params;
  const [Visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState(route.params.data);
  const image = route.params.image;
  const [text, setText] = React.useState();
  const id = route.params.id;
  const nextId = route.params.nextId;
  const allData = useSelector((state) => state.allData);
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.listData);
  const [ModalVisible, setModalVisible] = React.useState(false);
  const direct = route.params&&route.params.direct?route.params.direct:false;
  const isFocused=useIsFocused()
  const gigs=params.gigs;
  const [loader,setLoader]=useState(false)
  const user=useSelector(state=>state.user)
  const vendor=useSelector(state=>state.vendor)
  const [extra,setExtra]=useState([])
  //console.log(title)

  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);

  React.useEffect(() => {
   try{
    let arr=[]
    let selectedData=serverToLocal(gigs?.services?.options,gigs?.services?.category)
    selectedData?.map((doc)=>{
      let find=data.filter(d=>d.title===doc.title)
      if(find?.length==0){
        arr.push(doc.title)
      }
      // if(doc.title===("Jingles & Intros")){
      //   console.log(doc)
      // }
    })
    setExtra(uniq(arr))
   }catch(e){
    console.log(e.message)
   }
    //console.log(listData)
    if (route.name == "SubCategories") {
      //setData(allData[id].data);
      //console.log(allData[id].data[allData[id].data.length - 1]);
    } else {
      //setData(allData[id].data[nextId].data);
      //console.log(
      // allData[id].data[nextId].data[allData[id].data[nextId].data.length - 1]
      //);
    }
  }, []);

  const deleteData = (title) => {
    if (route.name === "SubCategories") {
      let arr = data.filter((data) => data.title != title);
      //dispatch(setArrayReplaceData(arr, id));
      setData(arr);
    } else {
      let arr = data.filter((data) => data.title != title);
      //dispatch(setArrayReplaceData2(arr, id, nextId));
      setData(arr);
    }
    //dispatch(setListData(!listData))
  };
  const addData = (value,i) => {
    setText(value);
    let oldArr = data;
    oldArr.push({
      title: value,
      deletable: true,
      list: [
        {
          title: value,
          data: [],
        },
      ],
    });
    if (route.name === "SubCategories") {
      // dispatch(setArrayReplaceData(oldArr, id));
      setData(oldArr);
      setText("");
    } else {
      // dispatch(setArrayReplaceData2(oldArr, id, nextId));
      setData(oldArr);
      setText("");
    }
    //dispatch(setListData(oldArr))
  };
  const action = (data,i) => {
    if (data.data) {
      navigation.navigate("EditSubCategory_1", {
        title: data.title,
        data: data.data,
        image: data.image,
        id: id,
        nextId: i,
        mainTitle: params.mainTitle,
        title: data.title,
      });
    } else {
      if (route.name === "EditSubCategory") {
        navigation.navigate("EditTableData", {
          title: data.title,
          list: data.list,
          id: id,
          nextId: i,
          mainTitle: params.mainTitle,
          title: data.title,
        });
      } else {
        navigation.navigate("EditTableData", {
          title: data.title,
          list: data.list,
          id: id,
          nextId: nextId,
          lastId: i,
          mainTitle: params.mainTitle,
          title: params.title,
          subTitle: data.title,
        });
      }
    }
  };
  const updateData=()=>{
    setLoader(true)
    updateGigsData(user.token,{
      gigId:gigs.id,
      services:{
        options:localOptionsToServer(listData),
        category:gigs.services.category,
        type:gigs?.services?.type
      }
    }).then(res=>{
      updateVendorInfo()
    }).catch(err=>{
      setLoader(false)
      console.error(err.response.data.msg)
    })
  }
  const updateVendorInfo=async()=>{
    const res=await getService(user.token,vendor.service.id);
    if(res){
      setLoader(false)
      dispatch({ type: "SET_VENDOR", playload: res.data });
      navigation.navigate("VendorProfile");
    }
  }
  if(loader){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityLoader/>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView contentContainerStyle={{flex:0}} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={image}
          style={{
            height: 250,
            marginBottom: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.628)",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  marginLeft: 20,
                },
              ]}
            >
              Choose
            </Text>
            <Text
              style={[
                styles.text,
                {
                  marginLeft: 80,
                },
              ]}
            >
              Your Services
            </Text>
          </View> 
        </ImageBackground>
        {Array.isArray(data) ? (
          data
            .sort((a, b) => a.title > b.title)
            .map((data, i) => (
              <SubCategoryCart
                id={id}
                nextId={i}
                deleteData={deleteData}
                key={i}
                onPress={() => action(data,i)}
                title={data.title}
                data={data}
              />
            ))
        ) : (
          <></>
        )}
        {Array.isArray(extra) ? (
          extra
            .sort((a, b) => a > b)
            .map((data, i) => (
              <SubCategoryCart
                id={id}
                nextId={i}
                deleteData={deleteData}
                key={i}
                onPress={() => {
                  navigation?.navigate("EditTableData", {
                    title: data,
                    list: [],
                    id: id,
                    nextId: nextId,
                    mainTitle: params.mainTitle,
                    title: params.title,
                  });
                }}
                title={data}
                data={data}
              />
            ))
        ) : (
          <></>
        )}
        {Visible && <Input value={text} onChange={setText} />}
        {Array.isArray(data) && data[0].list && (
          <View>
            <AddButton
              onPress={() => {
                setModalVisible(true);
              }}
              title={"Add New"}
            />
          </View>
        )}

        <View style={{ height: 10 }} />
      </ScrollView>
      <IconButton
        disabled={listData && listData.length > 0 ? false : true}
        onPress={() => {
          if (route.name === "EditSubCategory") {
            updateData()
          } else {
            navigation.goBack();
          }
        }}
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          borderRadius: 5,
          color: "white",
          backgroundColor:
            listData && listData.length > 0 ? "#DA1E37" : "#707070",
          borderWidth: 0,
          height: 43,
        }}
        title={route.name == "EditSubCategory_1" ? "Done" : "Update"}
      />
      <Modal
        animationType="fade"
        visible={ModalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!ModalVisible);
        }}
      >
        <InputModal
          onChange={(value) => addData(value)}
          Close={setModalVisible}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default EditSubCategory;
const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontFamily: "Poppins-Light",
    color: textColor,
  },
});
