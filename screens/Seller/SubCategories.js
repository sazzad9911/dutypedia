import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";
import builder from "../../assets/Images/builder.webp";
import { textColor } from "./../../assets/colors";
import SubCategoryCart from "./../../Cart/Seller/SubCategoryCart";
import AddButton from "./../../components/AddButton";
import Input from "./../../components/Input";

const SubCategories = ({ navigation, route }) => {
  const title = route.params.title;
  const [Visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState(route.params.data);
  const image = route.params.image;
  const [text, setText] = React.useState()
  React.useEffect(() => {
    setData(route.params.data)
  },[route.params.data])
  const deleteData=(title) => {
    let arr=data.filter(data => data.title!=title)
    setData(arr)
  }
  return (
    <ScrollView>
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
        data.map((data, i) => (
          <SubCategoryCart deleteData={deleteData}
            key={i}
            onPress={() => {
              if (data.data) {
                navigation.navigate("SubCategories", {
                  title: data.title,
                  data: data.data,
                  image: data.image,
                });
              } else {
                navigation.navigate("TableData", {
                  title: data.title,
                  list: data.list,
                });
              }
            }}
            title={data.title}
            data={data}
          />
        ))
      ) : (
        <></>
      )}
      {Visible ? <Input value={text} onChange={setText} /> : <></>}
      {Array.isArray(data) && data[0].list ? (
        <AddButton 
          onPress={() => {
            setVisible(true);
            if(Visible){
              let oldArr=data;
              oldArr.push({
                title: text,
                deletable:true,
                list: [
                  {
                    title: text,
                    data:[],
                  }
                ]
              });
              setData(oldArr);
              setText('')
            }
          }} 
          title={Visible ? "Save" : "Add New"}
        />
      ) : (
        <></>
      )}
      <View style={{height:10}}/>
    </ScrollView>
  );
};

export default SubCategories;
const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontFamily: "Poppins-Light",
    color: textColor,
  },
});
