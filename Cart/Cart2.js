import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
function Cart2(props) {
  const [Love, setLove] = React.useState(false);
  return (
    <TouchableOpacity
      style={{
        width: 240,
        height: 240,
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowColor: "rgba(0, 0, 0, 0.636)",
        shadowRadius: 1,
        elevation: 1,
        shadowOpacity: 0.2,
        backgroundColor: primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 5,
      }}
    >
      <Image
        style={{
          height: 130,
          width: "100%",
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}
        source={{
          uri: "https://media.istockphoto.com/photos/graphic-designer-at-work-picture-id1363772590?b=1&k=20&m=1363772590&s=170667a&w=0&h=u2GS9_Sd396ng762zsKCR9zonfsw83lssqpxdlh0F4g=",
        }}
      />

      <View
        style={{
          flexDirection: "row",
        }}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            marginTop: 5,
            flex: 6,
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
            flex: 2,
            marginTop: 5,
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
          500৳
        </Text>
        <TouchableOpacity
          onPress={() => setLove(!Love)}
          style={{
            flex: 1,
          }}
        >
          {Love ? (
            <AntDesign name="heart" size={24} color="#DA1e37" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default Cart2;
