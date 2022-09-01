import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { textColor, primaryColor,assentColor } from "./../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
function Cart2(props) {
  const [Love, setLove] = React.useState(false);
  const navigation = props.navigation;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("OtherProfile");
      }}
      style={{
        width: 240,
        shadowColor: "#d5d5d5",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 4,
        backgroundColor: primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 5,
        paddingBottom: 15,
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
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <View>
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 20,
              flex: 1,
            }}
            source={{
              uri: "https://img.freepik.com/free-photo/stylish-little-smiling-girl-posing-dress-isolated-white-studio-background-caucasian-blonde-female-model-human-emotions-facial-expression-childhood-standing-with-hands-crossed_155003-23028.jpg?w=2000",
            }}
          />
          <View style={{
            width:10,
            height:10,
            backgroundColor:primaryColor,
            borderColor:assentColor,
            borderWidth: 1,
            borderRadius:5,
            position: "absolute",
            right:2,
            bottom:2,
          }}/>
        </View>
        <View
          style={{
            marginLeft: 10,
            flex: 5,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "bold",
              fontSize: 13,
            }}
          >
            Stock And Forex Market Training Center
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
            }}
          >
            Specialty: It, Graphic Design, Digital Marketing, Online Tution
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            marginTop: 5,
            flex: 6,
            marginBottom: 5,
            alignItems: "center",
          }}
        >
          <FontAwesome name="star" size={15} color="#FFCC00" />
          <FontAwesome name="star" size={15} color="#FFCC00" />
          <FontAwesome name="star" size={15} color="#FFCC00" />
          <FontAwesome name="star" size={15} color="#FFCC00" />
          <FontAwesome name="star" size={15} color="#FFCC00" />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 13,
              color: '#898585',
            }}
          >
            5.0
          </Text>
        </View>
        <View
          style={{
            flex: 2.5,
            marginTop: 5,
         
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: '#898585',
            }}
          >
            View 10k
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={2}
        style={{
          marginLeft: 10,
          marginRight: 10,
          color: textColor,
          fontSize:15,
          textAlign: 'justify',
          fontWeight: '600'
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
            fontWeight: "700"
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
