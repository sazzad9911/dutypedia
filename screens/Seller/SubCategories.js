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
  const data = route.params.data;
  return (
    <ScrollView>
      <ImageBackground
        source={builder}
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
          <SubCategoryCart key={i}
            onPress={() => {
              if (data.data) {
                navigation.navigate("SubCategories", {
                  title: data.title,
                  data: data.data,
                });
              } else {
                navigation.navigate("TableData", {
                  title: data.title,
                  list: data.list,
                });
              }
            }}
            title={data.title}
          />
        ))
      ) : (
        <></>
      )}
      {Visible ? <Input /> : <></>}
      <AddButton
        onPress={() => {
          setVisible(true);
        }}
        title={Visible ? "Save" : "Add New"}
      />
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
