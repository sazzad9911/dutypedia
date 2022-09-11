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
import Button from "./../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { setArrayReplaceData, setArrayReplaceData2,setListData } from "../../action";

const SubCategories = ({ navigation, route }) => {
  const title = route.params.title;
  const [Visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState(route.params.data);
  const image = route.params.image;
  const [text, setText] = React.useState();
  const id = route.params.id;
  const nextId = route.params.nextId;
  const allData = useSelector((state) => state.allData);
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.listData);

  React.useEffect(() => {
    if (route.name == "SubCategories") {
      setData(allData[id].data);
      //console.log(allData[id].data[allData[id].data.length - 1]);
    } else {
      setData(allData[id].data[nextId].data);
      //console.log(
      // allData[id].data[nextId].data[allData[id].data[nextId].data.length - 1]
      //);
    }
  }, [allData[id].data.length]);

  const deleteData = (title) => {
    if (route.name === "SubCategories") {
      let arr = allData[id].data.filter((data) => data.title != title);
      dispatch(setArrayReplaceData(arr, id));
      setData(arr);
    } else {
      let arr = allData[id].data[nextId].data.filter(
        (data) => data.title != title
      );
      dispatch(setArrayReplaceData2(arr, id, nextId));
      setData(arr);
    }
    //dispatch(setListData(!listData))
  };
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
          <SubCategoryCart id={id} nextId={i}
            deleteData={deleteData}
            key={i}
            onPress={() => {
              if (data.data) {
                navigation.navigate("SubCategories_1", {
                  title: data.title,
                  data: data.data,
                  image: data.image,
                  id: id,
                  nextId: i,
                });
              } else {
                if (route.name === "SubCategories") {
                  navigation.navigate("TableData", {
                    title: data.title,
                    list: data.list,
                    id: id,
                    nextId: i,
                  });
                } else {
                  navigation.navigate("TableData", {
                    title: data.title,
                    list: data.list,
                    id: id,
                    nextId: nextId,
                    lastId:i,
                  });
                }
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
        <View>
          <AddButton
            onPress={() => {
              setVisible(true);
              if (Visible && text) {
                let oldArr = data;
                oldArr.push({
                  title: text,
                  deletable: true,
                  list: [
                    {
                      title: text,
                      data: [],
                    },
                  ],
                });
                if (route.name === "SubCategories") {
                  dispatch(setArrayReplaceData(oldArr, id));
                  setData(oldArr);
                  setText("");
                } else {
                  dispatch(setArrayReplaceData2(oldArr, id, nextId));
                  setData(oldArr);
                  setText("");
                }
                //dispatch(setListData(oldArr))
              }
            }}
            title={Visible ? "Save" : "Add New"}
          />
          <Button
            onPress={() => {
              navigation.navigate("Pricing");
            }}
            style={{
              marginVertical: 20,
              marginHorizontal: 20,
              borderRadius: 5,
              color: "white",
              backgroundColor: "#DA1E37",
              borderWidth: 0,
              height: 43,
            }}
            title="Next"
          />
        </View>
      ) : (
        <></>
      )}
      <View style={{ height: 10 }} />
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
