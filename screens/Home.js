import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
import Cart from "../Cart/Cart";
import Cart1 from "../Cart/Cart1";
import Cart2 from "../Cart/Cart2";
import Options from "../Cart/Options";
import Seller from "../Cart/Seller";
import SellerCart from "./../Cart/SellerCart";
import CombineCart from "./../Cart/CombineCart";

const { width, height } = Dimensions.get("window");

const Home = () => {
  return (
    <ScrollView
      style={{
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            color: textColor,
            fontWeight: "bold",
            marginLeft: 5,
          }}
        >
          Category
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <Cart />
        <Cart />
        <Cart />
        <Cart />
      </ScrollView>
      <Text
        style={{
          fontWeight: "bold",
          marginVertical: 10,
          marginLeft: 5,
        }}
      >
        What is Your Best Interested Category
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <CombineCart num={[2, 3, 4]} Component={() => <Cart1 />} />
        <CombineCart num={[2, 3, 4]} Component={() => <Cart1 />} />
        <CombineCart num={[2, 3, 4]} Component={() => <Cart1 />} />
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            flex: 5,
            marginLeft: 5,
            fontSize:14
          }}
        >
          Some Suggest
        </Text>
        <TouchableOpacity
          style={{
            marginVertical: 10,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textDecorationLine: "underline",
              marginRight: 5,
              fontSize:14
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <Cart2 />
        <Cart2 />
        <Cart2 />
        <Cart2 />
      </ScrollView>

      <Text
        style={{
          fontWeight: "bold",
          marginVertical: 10,
          marginLeft: 5,
        }}
      >
        Top Seller
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <Options />
        <Options />
        <Options />
        <Options />
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <CombineCart num={[2, 3, 4]} Component={() => <Seller />} />
        <CombineCart num={[2, 3, 4]} Component={() => <Seller />} />
        <CombineCart num={[2, 3, 4]} Component={() => <Seller />} />
      </ScrollView>
      <Text
        style={{
          fontWeight: "bold",
          marginVertical: 10,
          marginLeft: 5,
        }}
      >
        Popular Category
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Options name="New Service" />
        <Options name="Electricity Service" />
        <Options />
        <Options />
      </View>
      <View style={{ height: 20 }} />
      <SellerCart />
      <View style={{ height: 10 }} />
    </ScrollView>
  );
};

export default Home;
