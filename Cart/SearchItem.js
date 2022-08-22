import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { primaryColor,secondaryColor,textColor } from "./../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const SearchItem = () => {
    const [Love,setLove]= React.useState(false);
  return (
    <TouchableOpacity style={styles.box}>
      <Image
        style={styles.image}
        source={{
          uri: "https://thumbs.dreamstime.com/b/technical-support-customer-service-business-technology-internet-concept-100232431.jpg",
        }}
      />
      <View style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <FontAwesome
            style={{ marginTop: 3 }}
            name="star"
            size={10}
            color="#FFCC00"
          />
          <FontAwesome
            style={{ marginTop: 3 }}
            name="star"
            size={10}
            color="#FFCC00"
          />
          <FontAwesome
            style={{ marginTop: 3 }}
            name="star"
            size={10}
            color="#FFCC00"
          />
          <FontAwesome
            style={{ marginTop: 3 }}
            name="star"
            size={10}
            color="#FFCC00"
          />
          <FontAwesome
            style={{ marginTop: 3 }}
            name="star"
            size={10}
            color="#FFCC00"
          />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 10,
              color: textColor,
            }}
          >
            5.0
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: textColor,
            }}
          >
            View 10k
          </Text>
        </View>
      </View>
      <Text
        numLines={2}
        style={{
          marginLeft: 10,
          marginRight: 10,
          color: textColor,
        }}
      >
        I Will Make a Custom Graphics For Your Blog
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            flex: 6,
            marginLeft: 10,
            fontSize: 18,
            color: textColor,
          }}
        >
          500$
        </Text>
        <TouchableOpacity
          onPress={() => setLove(!Love)}
          style={{
            flex: 1,
          }}
        >
          {Love ? (
            <AntDesign name="heart" size={24} color={textColor} />
          ) : (
            <AntDesign name="hearto" size={24} color={textColor} />
          )}
        </TouchableOpacity>
      </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
const styles = StyleSheet.create({
  box: {
    width: "98%",
    height: 120,
    backgroundColor: primaryColor,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginHorizontal: "1%",
    overflow: "hidden",
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 120,
  },
});
