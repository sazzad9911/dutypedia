import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { textColor, primaryColor, secondaryColor } from "./../assets/colors";
import Cart from "../Cart/Cart";
import Cart1 from "../Cart/Cart1";
import Cart2 from "../Cart/Cart2";
import Options from "../Cart/Options";
import Seller from "../Cart/Seller";
import SellerCart from "./../Cart/SellerCart";
import CombineCart from "./../Cart/CombineCart";
import Animated, {
  useAnimatedStyle,
  withSpring,
  delayMS,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const Home = (props) => {
  const navigation = props.navigation;
  const [trans, setTrans] = React.useState(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(0 * 255),
        },
      ],
    };
  });

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyles]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              color: textColor,
              fontWeight: "bold",
              marginLeft: 5,
              paddingLeft: 15,
              paddingRight: 15,
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
          <View style={{ width: 15 }} />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <View style={{ width: 15 }} />
        </ScrollView>
        <Text
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            marginLeft: 5,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          What is Your Best Interested Category
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          <CombineCart num={[2, 3, 4]} Component={() => <Cart1 />} />
          <CombineCart num={[2, 3, 4]} Component={() => <Cart1 />} />
          <CombineCart num={[2, 3, 4]} Component={() => <Cart1 />} />
          <View style={{ width: 15 }} />
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
              fontSize: 14,
              paddingLeft: 15,
              paddingRight: 15,
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
                fontSize: 14,
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
          <View style={{ width: 15 }} />
          <Cart2 navigation={props.navigation} />
          <Cart2 navigation={props.navigation} />
          <Cart2 navigation={props.navigation} />
          <Cart2 navigation={props.navigation} />
          <View style={{ width: 15 }} />
        </ScrollView>

        <Text
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            marginLeft: 5,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          Top Seller
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          <Options />
          <Options />
          <Options />
          <Options />
          <View style={{ width: 15 }} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
        <View style={{ width: 15 }} />
          <CombineCart
            num={[2, 3, 4]}
            Component={() => <Seller navigation={navigation} />}
          />
          <CombineCart
            num={[2, 3, 4]}
            Component={() => <Seller navigation={navigation} />}
          />
          <CombineCart
            num={[2, 3, 4]}
            Component={() => <Seller navigation={navigation} />}
          />
          <View style={{ width: 15 }} />
        </ScrollView>
        <Text
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            marginLeft: 5,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          Popular Category
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: 15,
            paddingRight: 15,
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
    </Animated.View>
  );
};

export default Home;
