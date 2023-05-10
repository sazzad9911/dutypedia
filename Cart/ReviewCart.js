import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
//import { star } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import { primaryColor, secondaryColor, textColor } from "./../assets/colors";
import { dateDifference, numToArray } from "./../action";
const { width, height } = Dimensions.get("window");
import AnimatedHeight from "./../Hooks/AnimatedHeight";
import Avatar from "../components/Avatar";
import LargeText,{ExtraLargeText} from "../Hooks/LargeText";
import { types } from "./../screens/Vendor/account/types";
import { useSelector } from "react-redux";
import customStyle from "../assets/stylesheet";
import ViewMore from "../Hooks/ViewMore"

const ReviewCart = ({ navigation, data, individualRating,service }) => {
  const [height, setHeight] = useState(220);
  //console.log(service)
  return (
    <View
      style={{
        backgroundColor: primaryColor,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          paddingHorizontal: 20,
          marginTop: 5,
        }}>
        <Text style={styles.text1}>
          {data?.length < 9 ? `0${data?.length}` : data?.length} Review
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AllReview", {
              individualRating: individualRating,
              data: data,
              service:service?.service
            });
          }}>
          <Text style={styles.text1}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          paddingBottom: 20,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View style={{ width: 10 }} />
        {data &&
          data.map((doc, i) => (
            <Cart
              service={service?.service}
              noReplay={true}
              data={doc}
              key={i}
              style={{
                width: width - 50,
                marginHorizontal: 10,
              }}
              onHeight={setHeight}
            />
          ))}
        {data && data.length == 0 && (
          <View style={[customStyle.fullBox, { width: width - 20 }]}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginVertical: 50,
                textAlign: "center",
                flex: 1,
              }}>
              No Rating
            </Text>
          </View>
        )}
        <View style={{ width: 10 }} />
      </ScrollView>
      <View
        style={{ height: 1, width: "100%", backgroundColor: secondaryColor }}
      />
    </View>
  );
};

export default ReviewCart;
const styles = StyleSheet.create({
  text1: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  text2: {
    fontSize: 14,
    color: textColor,
    fontFamily: "Poppins-Medium",
  },
  text3: {
    fontSize: 11,
    color: textColor,
    fontFamily: "Poppins-Medium",
  },
});
export const Cart = ({
  replied,
  onReplay,
  noReplay,
  data,
  style,
  onLayout,
  service
}) => {
  const [button, setButton] = useState(true);
  const [day, setDay] = useState(dateDifference(data?.createdAt, new Date()));
  //const user = useSelector((state) => state.user);
  //console.log(user)
  //console.log(service)
  return (
    <View
      onLayout={onLayout}
      style={[
        {
          borderColor: "#E6E6E6",
          borderWidth: 1,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 8,
          marginTop: 28,
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            style={{
              width: 40,
              height: 40,
              borderWidth: 0,
            }}
            source={{
              uri: data
                ? data?.user?.profilePhoto
                : "https://hindidp.com/wp-content/uploads/2022/02/cute_beautiful_dp_fo_wHC8X.jpg",
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.text1]}>
              {data
                ? `${data?.user?.name}`
                : "Sumaiya Alam"}
            </Text>
            <Text
              style={[
                styles.text1,
                { fontWeight: "400", color: "#767676", marginTop: 4 },
              ]}>
              {day
                ? `${
                    day == 0
                      ? "Today"
                      : day == 1
                      ? "Yesterday"
                      : day > 365
                      ? "1 year ago"
                      : day > 30
                      ? `${parseInt(day / 30)} month ago`
                      : day > 7
                      ? `${parseInt(day / 7)} week ago`
                      : `${day} days`
                  }`
                : "Not Found"}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.text1,
            { justifySelf: "flex-end", fontWeight: "400" },
          ]}>
          {data
            ? types.filter((d) => d.type.match(data?.order?.type))[0]?.title
            : "Bargaining"}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        {data && data.text && (
          <LargeText
            fontStyle={{
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 20,
              marginTop: 12,
            }}
            title="See More"
            text={data.text}
            onChange={setButton}
            button={button}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: "row",
            }}>
            <SvgXml xml={star} />
            <Text
              style={[
                styles.text1,
                {
                  marginLeft: 10,
                  fontWeight: "500",
                },
              ]}>
              {data?.qualityRating > parseInt(data?.qualityRating)
                ? data?.qualityRating?.toFixed(1)
                : `${data?.qualityRating}.0`}
            </Text>
          </View>
          {!data?.reply && !noReplay && (
            <TouchableOpacity
              onPress={() => {
                if (onReplay) {
                  onReplay();
                }
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <SvgXml xml={replay} />
              <Text
                style={[
                  styles.text1,
                  {
                    fontWeight: "400",
                    fontSize: 16,
                    marginLeft: 10,
                    lineHeight: 17,
                  },
                ]}>
                Replay
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {data?.reply && (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: "#E6E6E6",
                marginVertical: 12,
              }}
            />
            <View
              style={{
                marginLeft: 64,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Avatar
                  source={{ uri: service?.profilePhoto }}
                  style={{ height: 25, width: 25, borderWidth: 0 }}
                />
                <Text style={[styles.text1, { marginLeft: 12 }]}>
                  {`${service?.user?.firstName} ${service?.user?.lastName}`}
                </Text>
              </View>
              <ExtraLargeText
                fontStyle={{
                  fontSize: 14,
                  fontWeight: "400",
                  lineHeight: 20,
                  marginTop: 10,
                }}
                title="See More"
                text={data.reply}
                onChange={setButton}
                button={button}
              />
              {/* <ViewMore
                fontStyle={{
                  fontSize: 14,
                  fontWeight: "400",
                  lineHeight: 20,
                }}
                style={{
                  marginTop: 10,
                  backgroundColor:"red"
                }}
                lowHeight={40}
                position={{
                  bottom:-5,
                  
                }}
                component={
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      lineHeight: 20,
                    }}>
                    {data.text}
                  </Text>
                }
              /> */}
              
            </View>
          </>
        )}
      </View>
    </View>
  );
};
export const CartView = ({
  replied,
  onReplay,
  noReplay,
  data,
  style,
  onHeight,
}) => {
  const [button, setButton] = useState(true);
  const [day, setDay] = useState(dateDifference(data?.createdAt, new Date()));
  const user = useSelector((state) => state.user);
  //console.log(user)
  //console.log(data)

  return (
    <View
      style={[
        {
          borderColor: "#E6E6E6",
          borderWidth: 1,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 8,
          marginTop: 28,
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            style={{
              width: 40,
              height: 40,
              borderWidth: 0,
            }}
            source={{
              uri: data
                ? data.user.profilePhoto
                : "https://hindidp.com/wp-content/uploads/2022/02/cute_beautiful_dp_fo_wHC8X.jpg",
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.text1]}>
              {data
                ? `${data.user.firstName} ${data.user.lastName}`
                : "Sumaiya Alam"}
            </Text>
            <Text
              style={[
                styles.text1,
                { fontWeight: "400", color: "#767676", marginTop: 4 },
              ]}>
              {day
                ? `${
                    day == 0
                      ? "Today"
                      : day == 1
                      ? "Yesterday"
                      : day > 365
                      ? "1 year ago"
                      : day > 30
                      ? `${parseInt(day / 30)} month ago`
                      : day > 7
                      ? `${parseInt(day / 7)} week ago`
                      : `${day} days`
                  }`
                : "Not Found"}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.text1,
            { justifySelf: "flex-end", fontWeight: "400" },
          ]}>
          {data
            ? types.filter((d) => d.type.match(data?.order?.type))[0]?.title
            : "Bargaining"}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        {data && data.text && (
          <LargeText
            fontStyle={{
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 20,
              marginTop: 12,
            }}
            title="See More"
            text={data.text}
            button={button}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: "row",
            }}>
            <SvgXml xml={star} />
            <Text
              style={[
                styles.text1,
                {
                  marginLeft: 10,
                  fontWeight: "500",
                },
              ]}>
              {data?.qualityRating > parseInt(data?.qualityRating)
                ? data?.qualityRating
                : `${data?.qualityRating}.0`}
            </Text>
          </View>
        </View>
        {data?.reply && (
          <View style={{}}>
            <View
              style={{
                height: 1,
                backgroundColor: "#E6E6E6",
                marginVertical: 12,
              }}
            />
            <View
              style={{
                marginLeft: 64,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Avatar
                  source={{ uri: user?.user?.profilePhoto }}
                  style={{ height: 25, width: 25, borderWidth: 0 }}
                />
                <Text style={[styles.text1, { marginLeft: 12 }]}>
                  {`${user?.user?.firstName} ${user?.user?.lastName}`}
                </Text>
              </View>
              <LargeText
                fontStyle={{
                  fontSize: 14,
                  fontWeight: "400",
                  lineHeight: 20,
                  marginTop: 10,
                }}
                title="See More"
                text={data.reply}
                button={button}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const star = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.86447 1.75669L7.74447 3.51669C7.86447 3.76169 8.18447 3.99669 8.45447 4.04169L10.0495 4.30669C11.0695 4.47669 11.3095 5.21669 10.5745 5.94669L9.33447 7.18669C9.12446 7.39669 9.00947 7.80169 9.07446 8.09169L9.42947 9.62669C9.70947 10.8417 9.06447 11.3117 7.98947 10.6767L6.49447 9.79169C6.22447 9.63169 5.77947 9.63169 5.50447 9.79169L4.00947 10.6767C2.93947 11.3117 2.28947 10.8367 2.56947 9.62669L2.92447 8.09169C2.98947 7.80169 2.87447 7.39669 2.66447 7.18669L1.42447 5.94669C0.694466 5.21669 0.929466 4.47669 1.94947 4.30669L3.54447 4.04169C3.80947 3.99669 4.12947 3.76169 4.24947 3.51669L5.12947 1.75669C5.60947 0.801686 6.38947 0.801686 6.86447 1.75669Z" fill="#F9BF00" stroke="#F9BF00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const replay = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M7 14C10.8661 14 14 10.8661 14 7C14 3.1339 10.8661 0 7 0C3.1339 0 0 3.1339 0 7C0 10.8661 3.1339 14 7 14Z" fill="#1A1A1A"/>
<path d="M9.02995 3.91302H5.11695L5.40395 3.62602C5.60695 3.42302 5.60695 3.08702 5.40395 2.88402C5.30515 2.78638 5.17185 2.73163 5.03295 2.73163C4.89405 2.73163 4.76075 2.78638 4.66195 2.88402L3.47895 4.06702C3.42995 4.11602 3.39495 4.17202 3.36695 4.23502C3.31095 4.36102 3.31095 4.50802 3.36695 4.63402C3.39495 4.69702 3.42995 4.75302 3.47895 4.80202L4.66195 5.98502C4.76695 6.09002 4.89995 6.13902 5.03295 6.13902C5.16595 6.13902 5.29895 6.09002 5.40395 5.98502C5.60695 5.78202 5.60695 5.44602 5.40395 5.24302L5.11695 4.95602H9.02995C9.35895 4.95602 9.62495 5.22202 9.62495 5.55102V6.79002C9.62495 7.07702 9.86295 7.31502 10.15 7.31502C10.437 7.31502 10.675 7.07702 10.675 6.79002V5.55102C10.675 4.65502 9.93295 3.91302 9.02995 3.91302ZM10.633 9.35902C10.6064 9.29651 10.5685 9.23953 10.521 9.19102L9.33795 8.00802C9.23915 7.91038 9.10585 7.85563 8.96695 7.85563C8.82805 7.85563 8.69475 7.91038 8.59595 8.00802C8.39295 8.21102 8.39295 8.54702 8.59595 8.75002L8.88295 9.03702H4.96995C4.81215 9.03702 4.66081 8.97433 4.54922 8.86275C4.43764 8.75116 4.37495 8.59982 4.37495 8.44202V7.20302C4.37495 6.91602 4.13695 6.67802 3.84995 6.67802C3.56295 6.67802 3.32495 6.91602 3.32495 7.20302V8.44202C3.32495 9.35202 4.06695 10.087 4.96995 10.087H8.88295L8.59595 10.374C8.39295 10.577 8.39295 10.913 8.59595 11.116C8.70095 11.221 8.83395 11.27 8.96695 11.27C9.09995 11.27 9.23295 11.221 9.33795 11.116L10.521 9.93302C10.57 9.88402 10.605 9.82802 10.633 9.76502C10.6607 9.70094 10.675 9.63185 10.675 9.56202C10.675 9.49219 10.6607 9.4231 10.633 9.35902Z" fill="white"/>
</svg>
`;
