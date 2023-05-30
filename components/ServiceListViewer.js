import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import ViewMore from "../Hooks/ViewMore";
import AddButton from "./AddButton";
import Button from "./Button";
import IconButton from "./IconButton";

export default function ServiceListViewer({
  serviceCategory,
  facilities,
  skills,
  getLayoutHeight,
  onEdit,
  editable,
}) {
  const [active, setActive] = useState(serviceCategory?.name);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [text, setText] = useState();
  useEffect(() => {
    if (active == "Extra Facilities") {
      let t = "";
      facilities?.map((d, i) => {
        t = `${t}${i != 0 ? ", " : ""}${d.title}`;
      });
      setText(t);
    } else {
      let t = "";
      skills?.map((d, i) => {
        t = `${t}${i != 0 ? ", " : ""}${d}`;
      });
      setText(t);
    }
    getLayoutHeight && getLayoutHeight(73);
  }, [skills?.length,facilities?.length]);
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
        {editable && (
          <TouchableOpacity
            onPress={() => {
              onEdit && onEdit();
              // const gigs = vendor.service.gigs.filter(
              //   (d) => d.type == "STARTING"
              // );

              // navigation.navigate("EditServiceList", {
              //   NewDataList: serverToLocal(
              //     gigs[0].services.options,
              //     gigs[0].services.category
              //   ),
              //   facilities: Facilities,
              //   name: "VendorOrderDetails",
              //   data: "ONETIME",
              //   gigs: data,
              // });
            }}>
            <SvgXml xml={editIcon} height={"50"} width={"50"} />
          </TouchableOpacity>
        )}
      </View>
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
                facilities?.map((d, i) => {
                  t = `${t}${i != 0 ? ", " : ""}${d.title}`;
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
            onChange={(e) => {
              if (e) {
                getLayoutHeight && getLayoutHeight(layoutHeight);
              } else {
                getLayoutHeight && getLayoutHeight(73);
              }
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
    fontSize: 14,
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
    fontSize: 14,
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
const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="41.275" height="19" viewBox="0 0 41.275 19">
<g id="Group_10263" data-name="Group 10263" transform="translate(-118.725 -664)">
  <text id="edit" transform="translate(135 679)" fill="#86939b" font-size="14" font-weight="500"><tspan x="0" y="0">Edit</tspan></text>
  <g id="_1159633" data-name="1159633" transform="translate(118.825 667.001)">
    <g id="_000000ff" data-name="#000000ff" transform="translate(0 1.999)">
      <path id="Path_20919" data-name="Path 20919" d="M144.311,2.057a1.269,1.269,0,0,1,1,.1,3.066,3.066,0,0,1,.586.518,1.284,1.284,0,0,1,.39.871v.095a1.294,1.294,0,0,1-.2.625,2.273,2.273,0,0,1-.342.387l-4.733,4.733a.574.574,0,0,1-.239.18q-1.172.327-2.345.651a.293.293,0,0,1-.286-.056.283.283,0,0,1-.081-.292c.213-.776.43-1.551.643-2.327a.371.371,0,0,1,.1-.185l4.965-4.966a1.293,1.293,0,0,1,.54-.336m.165.538c-.246.076-.394.3-.578.465.435.444.88.878,1.316,1.322.113-.1.215-.207.319-.315a.7.7,0,0,0,.134-.745,2.041,2.041,0,0,0-.447-.525.715.715,0,0,0-.745-.2M139.4,7.557c.436.445.882.88,1.319,1.324.4-.393.795-.794,1.193-1.19l2.91-2.91L143.5,3.46q-2.052,2.048-4.1,4.1m-.265.533q-.2.73-.4,1.461c.486-.134.972-.27,1.458-.4C139.842,8.792,139.487,8.443,139.136,8.091Z" transform="translate(-135.009 -1.999)" fill="#86939b" stroke="#86939b" stroke-width="0.2"/>
      <path id="Path_20920" data-name="Path 20920" d="M.276,52.1a1.4,1.4,0,0,1,.909-.553,2.832,2.832,0,0,1,.445-.019H3.742a1.209,1.209,0,0,1,.222.009.281.281,0,0,1-.088.552H1.629a1.654,1.654,0,0,0-.452.034.836.836,0,0,0-.488.368.883.883,0,0,0-.128.477q0,3.611,0,7.222A1.023,1.023,0,0,0,.6,60.5a.84.84,0,0,0,.532.546,1.844,1.844,0,0,0,.582.048H9.25a.854.854,0,0,0,.784-.468,1.472,1.472,0,0,0,.091-.695q0-1.08,0-2.16a.281.281,0,1,1,.561,0q0,1.233,0,2.466a1.412,1.412,0,0,1-.39.983,1.379,1.379,0,0,1-1,.431c-1.131-.008-2.262,0-3.393,0-1.514,0-3.027,0-4.541,0a1.37,1.37,0,0,1-.981-.442A1.421,1.421,0,0,1,0,60.294v-7.4A1.422,1.422,0,0,1,.276,52.1Z" transform="translate(0 -50.438)" fill="#86939b" stroke="#86939b" stroke-width="0.2"/>
    </g>
    <g id="_0000008c" data-name="#0000008c" transform="translate(1.359 13.207)">
      <path id="Path_20921" data-name="Path 20921" d="M61.72,510.974c1.514,0,3.027,0,4.541,0,1.131,0,2.262,0,3.393,0l.027.018H61.72Z" transform="translate(-61.72 -510.971)" fill="#86939b" stroke="#86939b" stroke-width="0.2" opacity="0.55"/>
    </g>
  </g>
</g>
</svg>
`;
