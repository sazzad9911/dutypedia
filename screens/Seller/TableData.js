import React from "react";
import { ScrollView, Dimensions, Text, View,Platform } from "react-native";
import { DataTable } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import { primaryColor } from "./../../assets/colors";
import AddButton from "./../../components/AddButton";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");

const optionsPerPage = [2, 3];

const TableData = (props) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const list=props.route.params.list
  

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
      {
        Array.isArray(list)?(
          list.map((list, i)=>(
            <Table key={i} data={list.data} title={list.title} {...props} />
          ))
        ):(<></>)
      }
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
    </View>
  );
};

export default TableData;
const Table = ({ navigation, route, title,data }) => {
  const [Visible, setVisible] = React.useState(false);

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
                fontSize: 15,
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
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Select
            </Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: "#e5e5e5" }} />
        {
          Array.isArray(data)?(
            data.map((data, i)=>(
              <Rows data={data} key={i} title={data.title} />
            ))
          ):(<></>)
        }
      </View>
      {Visible ? <Input /> : <></>}
      <AddButton
        onPress={() => {
          setVisible(true);
        }}
        title={Visible ? "Save" : "Add New"}
      />
    </View>
  );
};
const Rows = ({title,data}) => {
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
          fontSize: 14,
          fontFamily: "Poppins-Light",
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{
          borderWidth:Platform.OS=='ios' ?1:0,
          borderColor:'#e5e5e5',
          height:20,
          width:20,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
      </View>
    </View>
  );
};
