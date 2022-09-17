import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
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
import InputModal from "./InputModal";

const SubCategories = ({ navigation, route }) => {
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

  React.useEffect(() => {
    console.log(listData)
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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View>
          {Array.isArray(data) ? (
            data.map((data, i) => (
              <SubCategoryCart
                id={id}
                nextId={i}
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
                      mainTitle: params.mainTitle,
                      title: data.title,
                    });
                  } else {
                    if (route.name === "SubCategories") {
                      navigation.navigate("TableData", {
                        title: data.title,
                        list: data.list,
                        id: id,
                        nextId: i,
                        mainTitle: params.mainTitle,
                        title: data.title,
                      });
                    } else {
                      navigation.navigate("TableData", {
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
                }}
                title={data.title}
                data={data}
              />
            ))
          ) : (
            <></>
          )}
        </View>
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
      <Button
        disabled={listData && listData.length > 0 ? false : true}
        onPress={() => {
          if (route.name === "SubCategories") {
            navigation.navigate("Pricing");
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
        title={route.name == "SubCategories_1" ? "Done" : "Next"}
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
          onChange={(value) => {
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
          }}
          Close={setModalVisible}
        />
      </Modal>
    </KeyboardAvoidingView>
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
