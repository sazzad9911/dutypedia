import React from "react";
import {
  ScrollView,
  Dimensions,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { DataTable } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import { primaryColor, backgroundColor } from "./../../assets/colors";
import AddButton from "./../../components/AddButton";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import uuid from "react-native-uuid";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setListData,
  setListReplace1,
  setListReplace2,
  setListReplace3,
  addListData,
  deleteListData,
} from "../../action";
import { AllData } from "../../Data/AllData";

const optionsPerPage = [2, 3];

const TableData = (props) => {
  const [page, setPage] = React.useState(0);
  const list = props.route.params.list;
  const title = props.route.params.title;
  const [Visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.listData);
  const allData = useSelector((state) => state.allData);
  const [selectedData, setSelectedData] = React.useState(null);
  const [buttonPress, setButtonPress] = React.useState(false);
  const exit = props.route.params.exit;
  const navigation = props.navigation;
  const id = props.route.params.id;
  const nextId = props.route.params.nextId;
  const lastId = props.route.params.lastId;
  const [data, setData] = React.useState(AllData[id]);
  const length = useSelector((state) => state.length);
  const [newSelectedData, setNewSelectedData] = React.useState([]);
  const [Uncheck, setUncheck] = React.useState([]);

  React.useEffect(() => {
    if (newSelectedData.length != 0) {
      setButtonPress(true);
    } else {
      setButtonPress(false);
    }
  }, [newSelectedData.length]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.isArray(list) ? (
          list.map((list, i) => (
            <Table
              key={i}
              data={list.data}
              tableName={list.title}
              {...props}
              tableId={i}
              setButtonPress={setButtonPress}
              setSelectedData={setNewSelectedData}
              SelectedData={newSelectedData}
              setUncheck={setUncheck}
            />
          ))
        ) : (
          <></>
        )}
        {exit && (
          <Button
            disabled={buttonPress ? false : true}
            onPress={() => {
              navigation.navigate("Pricing");
              setButtonPress(false);
              dispatch({
                type: "SET_LENGTH",
                playload: newSelectedData.length,
              });
              //dispatch(setListData(newSelectedData));
              newSelectedData.forEach((doc) => {
                dispatch(addListData(doc));
              });
              Uncheck.forEach((doc) => {
                dispatch(deleteListData(doc));
              });
            }}
            style={{
              marginTop: 20,
              marginBottom: 10,
              borderRadius: 5,
              backgroundColor: buttonPress ? backgroundColor : "#707070",
              color: "white",
              marginHorizontal: 20,
              borderWidth: 0,
              height: 45,
            }}
            title="Next"
          />
        )}
      </ScrollView>
      {!exit && (
        <Button
          disabled={buttonPress ? false : true}
          onPress={() => {
            //dispatch(setListData(!listData));
            setButtonPress(false);
            // props.navigation.navigate("SubCategories_1", {
            //   title: data.title,
            //   data: data.data,
            //   image: data.image,
            //   id: id,
            // });
            dispatch({ type: "SET_LENGTH", playload: newSelectedData.length });
            //dispatch(setListData([]));
            newSelectedData.forEach((doc) => {
              dispatch(addListData(doc));
            });
            Uncheck.forEach((doc) => {
              dispatch(deleteListData(doc));
            });
            navigation.goBack();
          }}
          style={{
            backgroundColor: buttonPress ? "green" : "#707070",
            borderRadius: 5,
            marginHorizontal: 20,
            marginVertical: 10,
            height: 40,
            color: "white",
          }}
          title="Save"
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default TableData;
const Table = ({
  navigation,
  route,
  tableName,
  data,
  tableId,
  setButtonPress,
  setSelectedData,
  SelectedData,
  setUncheck,
}) => {
  const [Visible, setVisible] = React.useState(false);
  const [Data, setData] = React.useState(data);
  const [text, setText] = React.useState();
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.listData);
  const allData = useSelector((state) => state.allData);
  const id = route.params.id;
  const nextId = route.params.nextId;
  const lastId = route.params.lastId;
  const listId = tableId;
  const mainTitle = route.params.mainTitle;
  const subTitle = route.params.subTitle;
  const titleS = route.params.title;

  const [ObjectId, setObjectId] = React.useState([]);

  const deleteData = (d) => {
    setButtonPress(true);
    let arr = SelectedData.filter((de) => de.data.id != d.id);
    setSelectedData(arr);
    setUncheck((val) => [...val, d.id]);
    const index = data.indexOf(d);
    if (index > -1) {
      data.splice(index, 1);
    }
  };
  const selectData = (title, selected,newId) => {
    if (!selected) {
      setUncheck((val) => [...val, newId]);
    }
    if (!selected && SelectedData.length > 0) {
      let arr = SelectedData.filter((d) => d.data.id != newId);
      setSelectedData(arr);
      return;
    }

    if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId) && !isNaN(lastId)) {
      let newData = {
        mainTitle: `${mainTitle}`,
        title: `${titleS}`,
        subTitle: `${subTitle}`,
        tableName: `${tableName}`,
        data: {
          id: newId,
          title: `${title}`,
          selected: selected,
        },
      };
      setSelectedData((data) => [...data, newData]);
    } else if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId)) {
      let newData = {
        mainTitle: `${mainTitle}`,
        title: `${titleS}`,
        tableName: `${tableName}`,
        data: {
          id: newId,
          title: `${title}`,
          selected: selected,
        },
      };
      setSelectedData((data) => [...data, newData]);
    } else if (!isNaN(id) && !isNaN(listId)) {
      let newData = {
        mainTitle: `${mainTitle}`,
        tableName: `${tableName}`,
        data: {
          id: newId,
          title: `${title}`,
          selected: selected,
        },
      };
      setSelectedData((data) => [...data, newData]);
    }
  };
  return (
    <View>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          backgroundColor: primaryColor,
          borderRadius: 5,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Platform.OS == "ios" ? 16 : 15,
              }}
            >
              {tableName}
            </Text>
          </View>
          <View
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Platform.OS == "ios" ? 16 : 15,
                textAlign: "center",
              }}
            >
              Select
            </Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: "#e5e5e5" }} />
        {Array.isArray(data) ? (
          data.sort((a,b)=>a.title>b.title).map((data, i) => (
            <Rows
              selectData={selectData}
              deleteData={deleteData}
              data={data}
              key={i}
              title={data.title}
              supTitle={tableName}
              id={id}
              setButtonPress={setButtonPress}
              SelectedData={SelectedData}
            />
          ))
        ) : (
          <></>
        )}
      </View>
      <AddButton
        onPress={() => {
          setVisible(true);
        }}
        title={"Add New"}
      />
      <Modal
        animationType="fade"
        visible={Visible}
        transparent={true}
        onRequestClose={() => {
          setVisible(!Visible);
        }}
      >
        <InputModal
          onChange={(value) => {
            setText(value);
            setButtonPress(true);
            let dataId=uuid.v4();
            data.push({
              id: dataId,
              title: value,
              deletable: true,
              selected: true,
            });
            // setData(d=>[...d,{
            //   id: uuid.v4(),
            //   title: text,
            //   deletable: true,
            //   selected: true,
            // }]);
            if (
              !isNaN(id) &&
              !isNaN(listId) &&
              !isNaN(nextId) &&
              !isNaN(lastId)
            ) {
              //dispatch(setListReplace1(newData, id, nextId, lastLid, listId));
              // let arr = listData;
              let list = {
                mainTitle: `${mainTitle}`,
                title: `${titleS}`,
                subTitle: `${subTitle}`,
                tableName: `${tableName}`,
                data: {
                  id: dataId,
                  title: `${value}`,
                  selected: true,
                },
              };
              setSelectedData((data) => [...data, list]);
            } else if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId)) {
              // let arr = listData;
              // dispatch(setListReplace2(newData, id, nextId, listId));
              let list = {
                mainTitle: `${mainTitle}`,
                title: `${titleS}`,
                tableName: `${tableName}`,
                data: {
                  id: dataId,
                  title: `${value}`,
                  deletable: true,
                  selected: true,
                },
              };
              setSelectedData((data) => [...data, list]);
            } else if (!isNaN(id) && !isNaN(listId)) {
              // let arr = listData;
              // dispatch(setListReplace3(newData, id, listId));
              let list = {
                mainTitle: `${mainTitle}`,
                tableName: `${tableName}`,
                data: {
                  id: dataId,
                  title: `${value}`,
                  deletable: true,
                  selected: true,
                },
              };
              setSelectedData((data) => [...data, list]);
            }
            setText("");
          }}
          Close={setVisible}
        />
      </Modal>
    </View>
  );
};
import { Observable } from "object-observer";
import InputModal from "./InputModal";
const Rows = ({
  title,
  data,
  deleteData,
  supTitle,
  selectData,
  id,
  setButtonPress,
  SelectedData,
}) => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.listData);
  const [Data, setData] = React.useState(listData);
  React.useEffect(() => {
    let arr = listData.filter(
      (d) => d.data.id == data.id
    );
    //console.log(arr)
    if (arr && arr.length > 0) {
      setChecked(true);
    }
  }, [listData.length]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 40,
      }}
    >
      <Text numberOfLines={2}
        style={{
          flex: 3,
          fontSize: Platform.OS == "ios" ? 16 : 14,
          fontFamily: "Poppins-Light",
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            borderWidth: Platform.OS == "ios" ? 1 : 0,
            borderColor: "#e5e5e5",
            height: 33,
            width: 33,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginTop: Platform.OS == "ios" ? 3 : 0,
            marginBottom: Platform.OS == "ios" ? 3 : 0,
          }}
        >
          {data.deletable ? (
            <TouchableOpacity
              onPress={() => {
                deleteData(data);
              }}
            >
              <AntDesign name="delete" size={22} color="red" />
            </TouchableOpacity>
          ) : (
            <Checkbox
              style={{
                backgroundColor: "red",
                transform: [
                  { scaleX: Platform.OS == "ios" ? 0.2 : 1 },
                  { scaleY: Platform.OS == "ios" ? 0.2 : 1 },
                ],
              }}
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                selectData(data.title, !checked,data.id);
                setChecked(!checked);
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
