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
import { primaryColor } from "./../../assets/colors";
import AddButton from "./../../components/AddButton";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import uuid from "react-native-uuid";
import { AntDesign } from "@expo/vector-icons";

const optionsPerPage = [2, 3];

const TableData = (props) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const list = props.route.params.list;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView>
        {Array.isArray(list) ? (
          list.map((list, i) => (
            <Table key={i} data={list.data} title={list.title} {...props} />
          ))
        ) : (
          <></>
        )}
      </ScrollView>
      <Button
        style={{
          backgroundColor: "green",
          color: "white",
          borderRadius: 5,
          marginHorizontal: 20,
          marginVertical: 10,
          height: 40,
        }}
        title="Save"
      />
    </KeyboardAvoidingView>
  );
};

export default TableData;
const Table = ({ navigation, route, title, data }) => {
  const [Visible, setVisible] = React.useState(false);
  const [Data, setData] = React.useState([]);
  const [text, setText] = React.useState();
  React.useEffect(() => {
    setData(data);
  }, [data]);
  const deleteData=(title) => {
    let arr= Data.filter(data => data.title!=title);
    setData(arr);
  }
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
          Data.map((data, i) => <Rows deleteData={deleteData} data={data} key={i} title={data.title} />)
        ) : (
          <></>
        )}
      </View>
      {Visible ? <Input value={text} onChange={setText} /> : <></>}
      <AddButton
        onPress={() => {
          setVisible(true);
          if (Visible) {
            let newData = Data;
            newData.push({
              id: uuid.v4(),
              title: text,
              deletable: true,
            });
            setText("");
          }
        }}
        title={Visible ? "Save" : "Add New"}
      />
    </View>
  );
};
const Rows = ({ title, data,deleteData }) => {
  const [checked, setChecked] = React.useState(false);
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
            height: 35,
            width: 35,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          {data.deletable ? (
            <TouchableOpacity onPress={() =>{
              deleteData(data.title)
            }}>
              <AntDesign name="delete" size={22} color="red" />
            </TouchableOpacity>
          ) : (
            <Checkbox
              style={{
                backgroundColor: "red",
                transform: [
                  { scaleX: Platform.OS == "ios" ? 0.4 : 1 },
                  { scaleY: Platform.OS == "ios" ? 0.4 : 1 },
                ],
              }}
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
