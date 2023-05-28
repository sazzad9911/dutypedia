import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ViewMore from "../Hooks/ViewMore";
import AddButton from "./AddButton";
import Button from "./Button";
import IconButton from "./IconButton";

export default function ServiceListViewer({
  serviceCategory,
  facilities,
  skills,
}) {
  const [active, setActive] = useState(serviceCategory?.name);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [text, setText] = useState();
  useEffect(() => {
    let t = "";
    skills?.map((d,i) => {
      t = `${t}${i!=0?", ":""}${d}`
    });
    setText(t);
  },[]);
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 22,
          marginBottom: 20,
          marginTop: 35,
          color: "#535353",
        }}>
        Service List
      </Text>
      <View
        style={{
          flexDirection: "row",
        }}>
        <View
          style={{
            flex: 1,
          }}>
          {serviceCategory && (
            <Button
              onPress={() => {
                setActive(serviceCategory?.name);
                let t = "";
                skills?.map((d) => {
                  t = t + d;
                });
                setText(t);
              }}
              style={
                active == serviceCategory?.name
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              title={serviceCategory?.name}
            />
          )}
          {facilities && (
            <Button
              onPress={() => {
                setActive("Extra Facilities");
                let t = "";
                facilities?.map((d,i) => {
                  t = `${t}${i!=0?", ":""}${d.title}`
                });
                setText(t);
              }}
              style={
                active == "Extra Facilities"
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              title={"Extra Facilities"}
            />
          )}
        </View>
        <View
          style={{
            flex: 2,
            marginLeft: 20,
          }}>
          <ViewMore
            style={{
              marginTop: 0,
            }}
            width={100}
            height={layoutHeight}
            component={
              <Text
                onLayout={(e) => {
                  setLayoutHeight(e.nativeEvent.layout.height);
                }}
                style={[styles.spText, { marginTop: 0 }]}>
               {text}
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  activeContent: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  inactiveContent: {},
  backgroundContainer: {
    minHeight: 300,
  },
  container: {
    minHeight: 30,
  },
  profile: {
    borderWidth: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },

    width: 110,
    height: 110,
    marginTop: -55,
    alignSelf: "center",

    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",

    width: 30,
    height: 30,
    borderRadius: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5,

    elevation: 5,
    shadowOpacity: 0.1,
  },
  iconTop: {
    position: "absolute",
    right: 20,
    top: 50,
    zIndex: 4,
  },
  iconBottom: {
    position: "absolute",
    zIndex: 4,
    bottom: -10,
    right: -10,
  },
  headLine: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
  },
  image: {
    width: 110,
    height: 110,
  },
  starIcon: {
    marginRight: 3,
  },
  activeButton: {
    color: "#666666",
    backgroundColor: "#4ADE80",
    borderRadius: 15,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
  },
  inactiveButton: {
    color: "#333333",
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
  },
  headLine: {
    fontSize: 24,

    fontWeight: "500",
  },
  input: {
    marginHorizontal: 0,
    borderWidth: 1,
    marginTop: 24,
    borderColor: "#A3A3A3",
  },
  text: {
    fontSize: 14,
    color: "#767676",
    fontWeight: "400",
  },
  button: {
    marginTop: 36,
    marginBottom: 32,
    borderRadius: 4,
  },
  spText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    marginTop: 24,
    color: "#1A1A1A",
  },
  seeMore: {
    fontWeight: "700",
    color: "#4ADE80",
  },
});
