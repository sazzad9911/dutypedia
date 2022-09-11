import React from "react";
import {
  ScrollView,
  Dimensions,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
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
} from "../../action";

const optionsPerPage = [2, 3];

const TableData = (props) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const list = props.route.params.list;
  const title = props.route.params.title;
  const [Visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.listData);
  const [selectedData, setSelectedData] = React.useState(null);
  const [buttonPress, setButtonPress] = React.useState(false);
  const exit = props.route.params.exit;
  const navigation = props.navigation;
  const id = props.route.params.id;
  const nextId = props.route.params.nextId;
  const lastId = props.route.params.lastId;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  React.useEffect(() => {});
  const storeData = (title) => {
    if (selectedData) {
      setSelectedData((data) => [...data, title]);
    } else {
      setSelectedData([title]);
    }
  };

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
              storeData={storeData}
              key={i}
              data={list.data}
              title={list.title}
              {...props}
              tableId={i}
              setButtonPress={setButtonPress}
            />
          ))
        ) : (
          <></>
        )}
        {exit ? (
          <Button
            disabled={buttonPress ? false : true}
            onPress={() => {
              navigation.navigate("Pricing");
            }}
            style={{
              marginTop: 20,
              marginBottom: 10,
              borderRadius: 5,
              backgroundColor: backgroundColor,
              color: buttonPress ? "white" : "gray",
              marginHorizontal: 20,
              borderWidth: 0,
              height: 45,
            }}
            title="Next"
          />
        ) : (
          <></>
        )}
      </ScrollView>
      {exit ? (
        <></>
      ) : (
        <Button
          disabled={buttonPress ? false : true}
          onPress={() => {
            //dispatch(setListData(!listData));
            setButtonPress(false);
            props.navigation.goBack();
          }}
          style={{
            backgroundColor: "green",
            borderRadius: 5,
            marginHorizontal: 20,
            marginVertical: 10,
            height: 40,
            color: buttonPress ? "white" : "gray",
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
  title,
  data,
  storeData,
  tableId,
  setButtonPress,
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

  React.useEffect(() => {}, [listData.length]);
  const deleteData = (title) => {
    let arr = Data.filter((data) => data.title != title);
    if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId) && !isNaN(lastId)) {
      dispatch(setListReplace1(arr, id, nextId, lastLid, listId));
    } else if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId)) {
      dispatch(setListReplace2(arr, id, nextId, listId));
    } else if (!isNaN(id) && !isNaN(listId)) {
      dispatch(setListReplace3(arr, id, listId));
    }
    let newArr=listData.filter(d=>d.data.title!=title);
    dispatch(setListData(newArr));
    setData(arr);
    setButtonPress(true);
  };
  const selectData = (title, selected, index) => {
    setButtonPress(true);
    if (!selected && listData.length > 0) {
      let newArr = listData.filter((d) => d.data.title != title);
      dispatch(setListData(newArr));
      return;
    }
    let arr = listData;
    if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId) && !isNaN(lastId)) {
      let newData = {
        mainTitle: allData[id].title,
        title: allData[id].data[nextId].title,
        subTitle: allData[id].data[nextId].data[lastId].title,
        data: {
          id: uuid.v4(),
          title: title,
          selected: selected,
        },
      };
      //console.log(newData);
      arr.push(newData);
      dispatch(setListData(arr));
    } else if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId)) {
      let newData = {
        mainTitle: allData[id].title,
        title: allData[id].data[nextId].title,
        data: {
          id: uuid.v4(),
          title: title,
          selected: selected,
        },
      };

      arr.push(newData);
      //console.log(arr);
      dispatch(setListData(arr));
    } else if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId)) {
      let newData = {
        mainTitle: allData[id].title,
        data: {
          id: uuid.v4(),
          title: title,
          selected: selected,
        },
      };
      //console.log(newData);
      arr.push(newData);
      dispatch(setListData(arr));
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
              {title}
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
          Data.map((data, i) => (
            <Rows
              selectData={selectData}
              storeData={storeData}
              deleteData={deleteData}
              data={data}
              key={i}
              title={data.title}
              supTitle={title}
              id={id}
            />
          ))
        ) : (
          <></>
        )}
      </View>
      {Visible ? <Input value={text} onChange={setText} /> : <></>}
      <AddButton
        onPress={() => {
          setVisible(true);
          if (Visible && text) {
            let newData = Data;
            newData.push({
              id: uuid.v4(),
              title: text,
              deletable: true,
              selected: true,
            });
            if (
              !isNaN(id) &&
              !isNaN(listId) &&
              !isNaN(nextId) &&
              !isNaN(lastId)
            ) {
              dispatch(setListReplace1(newData, id, nextId, lastLid, listId));
              let arr = listData;
              let list = {
                mainTitle: allData[id].title,
                title: allData[id].data[nextId].title,
                subTitle: allData[id].data[nextId].data[lastId].title,
                data: {
                  id: uuid.v4(),
                  title: text,
                  deletable: true,
                  selected: true,
                },
              };
              arr.push(list);
              dispatch(setListData(arr));
            } else if (!isNaN(id) && !isNaN(listId) && !isNaN(nextId)) {
              let arr = listData;
              dispatch(setListReplace2(newData, id, nextId, listId));
              let list = {
                mainTitle: allData[id].title,
                title: allData[id].data[nextId].title,
                data: {
                  id: uuid.v4(),
                  title: text,
                  deletable: true,
                  selected: true,
                },
              };
              arr.push(list);
              dispatch(setListData(arr));
            } else if (!isNaN(id) && !isNaN(listId)) {
              let arr = listData;
              dispatch(setListReplace3(newData, id, listId));
              let list = {
                mainTitle: allData[id].title,
                data: {
                  id: uuid.v4(),
                  title: text,
                  deletable: true,
                  selected: true,
                },
              };
              arr.push(list);
              dispatch(setListData(arr));
            }
            setButtonPress(true);
            setData(newData);
            setText("");
          }
        }}
        title={Visible ? "Save" : "Add New"}
      />
    </View>
  );
};
const Rows = ({
  title,
  data,
  deleteData,
  storeData,
  supTitle,
  selectData,
  id,
}) => {
  const [checked, setChecked] = React.useState(data.selected ? true : false);
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.listData);
  React.useEffect(() => {
    //console.log(listData);
  });
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 40,
      }}
    >
      <Text
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
          }}
        >
          {data.deletable ? (
            <TouchableOpacity
              onPress={() => {
                deleteData(data.title);
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
                selectData(data.title, !checked, id);
                setChecked(!checked);
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
