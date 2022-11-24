import React from "react";
import { View, ScrollView, Pressable,Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Menu } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

export default function CreateVendorAppointment({ navigation, route }) {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Online User" component={Screen} />
      <Tab.Screen name="Offline User" component={Screen} />
    </Tab.Navigator>
  );
}
const Screen = () => {
  return <View></View>;
};
const TabBar = ({
    state,
    descriptors,
    navigation,
    position,
    onClick,
    onPress,
  }) => {
    const ref = React.useRef();
    const packages = useSelector((state) => state.packages);
  
    const dispatch = useDispatch();
  
    React.useEffect(() => {
      //console.log(packages[state.index-1])
      //console.log(state.index);
      if (ref) {
        ref.current.scrollTo({ x: state.index * 80, animated: true });
      }
    }, [state.index]);
  
    return (
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#E9E6E6",
          borderBottomWidth: 0.5,
        }}
      >
        <ScrollView
          ref={ref}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {packages.map((doc, index) => {
            const isFocused = state.index === index;
  
            const [Visible, setVisible] = React.useState(false);
            const [Title, setTitle] = React.useState();
            const [id, setId] = React.useState();
            React.useEffect(() => {
              //console.log(packages[state.index-1])
              if (packages.length > index) {
                setTitle(`${packages[index].name} ${packages[index].price}৳`);
                setId(packages[index].id);
              }
            }, [index]);
            return (
              <View key={index}>
                <Pressable
                  onPress={() => {
                    navigation.navigate(doc.id);
                  }}
                  style={{
                    borderBottomColor: "#707070",
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 5,
                    height: 40,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {Title}
  
                    {/* {packages[state.index].name+" "+packages[state.index].price+"৳"} */}
                  </Text>
  
                  <Menu
                    contentStyle={{
                      backgroundColor: "white",
                    }}
                    visible={Visible}
                    onDismiss={() => setVisible(!Visible)}
                    anchor={
                      <Entypo
                        onPress={() => {
                          setVisible(true);
                        }}
                        style={{
                          marginLeft: 10,
                        }}
                        name="dots-three-vertical"
                        size={18}
                        color="black"
                      />
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        onClick(packages[index]);
                        setVisible(false);
                      }}
                      title="Edit"
                    />
                    <Menu.Item
                      onPress={() => {
                        onPress(id);
                        setVisible(false);
                      }}
                      title="Delete"
                    />
                  </Menu>
                </Pressable>
                {isFocused && (
                  <View
                    style={{
                      height: 2,
                      backgroundColor: "#707070",
                      width: "80%",
                      alignSelf: "center",
                    }}
                  />
                )}
              </View>
            );
          })}
          <View
            onLayout={() => {
              if (ref) {
                ref.current.scrollTo({ x: 10000, animated: true });
              }
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("Add Package");
              }}
              style={{
                borderBottomColor: "#707070",
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 5,
                height: 40,
                justifyContent: "center",
              }}
            >
              
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Add Package
              </Text>
            </Pressable>
            {state.index == packages.length && (
              <View
                style={{
                  height: 2,
                  backgroundColor: "#707070",
                  width: "80%",
                  alignSelf: "center",
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  };
