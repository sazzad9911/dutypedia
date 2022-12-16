import React from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Color } from "../assets/colors";
const { width, height } = Dimensions.get("window");
import { useDispatch, useSelector } from "react-redux";
import { SvgXml } from "react-native-svg";

const ServiceCart = ({ data, onPress }) => {
  //console.log(data.packageData);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={{
        shadowColor: assentColor,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: primaryColor,
        margin: 10,
      }}
    >
      <View
        style={{
          width: width / 2 - 30,
          height: width / 2 - 10,
          overflow: "hidden",
          borderRadius: 10,
          backgroundColor: primaryColor,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "50%",
            opacity:.9
          }}
          source={{
            uri: data?.images[0],
          }}
        />
        <View
          style={{
            padding: 10,
            paddingTop: 15,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              lineHeight: 15,
              color: textColor,
            }}
          >
            {data?.title}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {data.type=="PACKAGE"&&(
              <View
              style={{
                flexDirection: "row",
                alignItems:'center',
                flex:1
              }}
            >
              <Text numberOfLines={1}
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                  marginRight: 5,
                }}
              >
                {data&&data.packageData
                &&data.packageData.map((doc,i)=>{
                  return `${i!=0?", ":""}${doc.price}৳`
                })}
              </Text>
              
            </View>
            )}
            {data.type != "PACKAGE" ? (
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                }}
              >
                {data?.price}৳
              </Text>
            ) : null}
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}
            >
              View {data?.service.views}
            </Text>
          </View>
        </View>
      </View>
      {data.type=="PACKAGE"&&(
        <SvgXml style={{
          position:"absolute",
          top:10,
          left:10
        }} xml={icon} height="15" width="15" />
      )}
    </TouchableOpacity>
  );
};

export default ServiceCart;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16.864" height="13" viewBox="0 0 16.864 13">
<g id="_ffb743ff" data-name="#ffb743ff" transform="translate(-15.984 -71.056)">
  <path id="Path_20617" data-name="Path 20617" d="M23.827,71.372a.712.712,0,0,1,1.2.024l2.515,3.77a1.3,1.3,0,0,0,.337.4.768.768,0,0,0,.893-.025q1.518-1.134,3.032-2.273a.98.98,0,0,1,.384-.222.564.564,0,0,1,.641.375,1.032,1.032,0,0,1-.014.475l-.993,6.453h-14.8q-.512-3.328-1.023-6.661a.556.556,0,0,1,.9-.525q1.6,1.2,3.193,2.393a.767.767,0,0,0,1.07-.185Q22.494,73.377,23.827,71.372Z" transform="translate(0 0)" fill="#ffb743"/>
  <path id="Path_20618" data-name="Path 20618" d="M45.4,372.462c0-.578,0-1.155,0-1.732H60.2v1.627a.84.84,0,0,1-.088.425.776.776,0,0,1-.706.416H46.153A.774.774,0,0,1,45.4,372.462Z" transform="translate(-28.378 -289.142)" fill="#ffb743"/>
</g>
</svg>
`;
