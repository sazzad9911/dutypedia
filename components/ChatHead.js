import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "./../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import OutsideView from "react-native-detect-press-outside";
import { Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { SvgXml } from "react-native-svg";
import { getUserInfo } from "../Class/member";
import logo from "./../assets/logo.png";

const ChatHead = ({ navigation, name, image, user, readOnly,message }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  const [visible, setVisible] = React.useState(false);
  const styles = StyleSheet.create({
    box: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 0,
    },
    image: {
      width: 30,
      height: 30,
      borderRadius: 20,
      marginLeft: 12,
      marginRight: 8,
      borderColor: "#e5e5e5",
    },
    text: {
      fontSize: 20,
      fontWeight: "500",
      color: "#000000",
      
      flex:1
    },
    icon: {
      marginLeft: 20,
    },
    menuContainer: {
      minWidth: 150,
      minHeight: 100,
      backgroundColor: primaryColor,
      position: "absolute",
      top: 20,
      right: 30,
      padding: 10,
      borderRadius: 5,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: "black",
    },
    menuSubContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 5,
      alignItems: "center",
      marginVertical: 5,
    },
  });
  const [CallingScreenVisible, setCallingScreenVisible] = React.useState(false);
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor);
  const users = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [notify, setNotify] = useState(true);
  //const [AudioOnly,setAudioOnly]=React.useState(false)
  //console.log(newUser.user)
  useEffect(() => {
    getUserInfo(users.token, user.id).then((res) => {
      setData(res.data);
    });
  }, []);

  //console.log(data)
  return (
    <View
      style={{
        minHeight: 50,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#F1EFEF",
      }}>
      <View style={styles.box}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgXml xml={backIcon} />
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignSelf: "center",
          }}
          onPress={() => {
            if (data&&!readOnly) {
              if(vendor){
                navigation.navigate("UserProfile", { user: data });
              }else{
                navigation.navigate("OtherProfile", {
                  serviceId: message.serviceId,
                  data: message,
                });
              }
              
            }
          }}>
          {readOnly ? (
            <Image style={[styles.image,{borderWidth:.2}]} source={logo} />
          ) : (
            <Avatar
              style={styles.image}
              source={vendor?{ uri: image ? image : null }:{ uri: message?.service ? message?.service?.profilePhoto : null }}
            />
          )}

          {readOnly||vendor?(<Text numberOfLines={1} style={styles.text}>
            {name ? `${name}` : "-----"}
            {readOnly ? " Support" : ""}
          </Text>):(<Text numberOfLines={1} style={styles.text}>
            {message?.service ? `${message?.service?.serviceCenterName}` : "-----"}
            {readOnly ? " Support" : ""}
          </Text>)}
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}>
        {vendor &&!readOnly&& (
          <Pressable
            onPress={() => {
              navigation.navigate("VendorServiceList", {
                userId: user?.id,
                offline: false,
              });
            }}>
            <SvgXml xml={cart} />
          </Pressable>
        )}
        <View style={{ width: 16 }} />
        {vendor &&!readOnly&& (
          <Pressable
            onPress={() => {
              // console.log(data)
              // return
              navigation.navigate("AppointmentForm", { data: data });
              // navigation.navigate("VendorServiceList", {
              //   userId: user?.id,
              //   offline: false,
              // });
            }}>
            <SvgXml xml={app} />
          </Pressable>
        )}
        {/* <View style={{ width: 16 }} /> */}
        {/* {!readOnly && (
          <Pressable
            onPress={() => {
              setNotify((v) => !v);
            }}>
            <SvgXml xml={notify ? notification : noNotification} />
          </Pressable>
        )} */}
      </View>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <MenuBar setVisible={setVisible} />
      </Modal>
    </View>
  );
};

export default ChatHead;

const MenuBar = (props) => {
  const [Call, setCall] = React.useState(false);
  const [Mute, setMute] = React.useState(false);
  const childRef = React.useRef();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  const styles = StyleSheet.create({
    box: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    text: {
      fontSize: 14,
      fontFamily: "Poppins-Medium",
    },
    icon: {
      marginLeft: 20,
    },
    menuContainer: {
      minWidth: 150,
      minHeight: 100,
      backgroundColor: primaryColor,
      position: "absolute",
      top: 20,
      right: 30,
      padding: 10,
      borderRadius: 5,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: "black",
    },
    menuSubContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 5,
      alignItems: "center",
      marginVertical: 5,
    },
  });
  return (
    <OutsideView
      childRef={childRef}
      onPressOutside={() => {
        // handle press outside of childRef event
        props.setVisible(false);
      }}>
      <View
        style={{
          width: "100%",
          height: "100%",
        }}>
        <View ref={childRef} style={styles.menuContainer}>
          <View style={styles.menuSubContainer}>
            <Ionicons name="ios-call" size={20} color={textColor} />
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 13,
                color: textColor,
              }}>
              Call
            </Text>
            <Switch
              style={{
                height: 35,
                transform: [
                  { scaleX: Platform.OS == "ios" ? 0.8 : 1 },
                  { scaleY: Platform.OS == "ios" ? 0.8 : 1 },
                ],
              }}
              color="#A8AF63"
              value={Call}
              onValueChange={(val) => {
                setCall(val);
              }}
            />
          </View>
          <View style={styles.menuSubContainer}>
            <Ionicons name="volume-mute" size={20} color={textColor} />
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 13,
                color: textColor,
              }}>
              Mute
            </Text>
            <Switch
              style={{
                height: 35,
                transform: [
                  { scaleX: Platform.OS == "ios" ? 0.8 : 1 },
                  { scaleY: Platform.OS == "ios" ? 0.8 : 1 },
                ],
              }}
              color="#A8AF63"
              value={Mute}
              onValueChange={(val) => {
                setMute(val);
              }}
            />
          </View>
          <TouchableOpacity style={styles.menuSubContainer}>
            <FontAwesome name="user-circle-o" size={20} color={textColor} />
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 13,
                color: textColor,
              }}>
              View Profile
            </Text>
            <View style={{ width: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    </OutsideView>
  );
};
const backIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.9201L8.48 13.4001C7.71 12.6301 7.71 11.3701 8.48 10.6001L15 4.08008" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const cart = `<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.65344 0.773028C7.29657 0.271935 8.10985 -0.014003 8.92688 0.000528282C9.77813 -0.00931547 10.6233 0.306153 11.2748 0.851309C11.8439 1.32522 12.2667 1.9735 12.4659 2.6874C12.6834 3.43647 12.5784 4.22397 12.6042 4.99225C13.7386 4.99272 14.873 4.99225 16.0078 4.99225C16.1967 4.98334 16.388 5.07147 16.4958 5.2285C16.6106 5.38084 16.6031 5.58053 16.6228 5.761C16.8113 7.81881 17.0002 9.87709 17.1905 11.9344C18.9942 12.3333 20.5622 13.6365 21.2967 15.3301C22.0355 16.9857 21.9441 18.9816 21.0553 20.5627C20.3006 21.9347 18.9816 22.9852 17.4708 23.4015C15.7069 23.9068 13.7208 23.5201 12.2747 22.3913C11.6892 21.9418 11.1933 21.3802 10.8075 20.7516C7.85344 20.7521 4.89938 20.7512 1.94485 20.7521C1.67391 20.7563 1.39735 20.7324 1.14329 20.6312C0.418598 20.3555 -0.080621 19.5727 0.0107852 18.796C0.416723 14.3672 0.823598 9.93803 1.23188 5.50928C1.25063 5.22193 1.51454 4.97865 1.80422 4.99272C2.94422 4.99272 4.08422 4.99084 5.22422 4.99365C5.25516 4.2324 5.14688 3.45287 5.35782 2.70897C5.56594 1.94631 6.0286 1.25678 6.65344 0.773028ZM7.17469 1.80662C6.67594 2.26459 6.37172 2.9274 6.35532 3.60475C6.34829 4.0674 6.3525 4.53053 6.35344 4.99318C8.06157 4.99131 9.77016 4.99318 11.4788 4.99225C11.4778 4.56147 11.4802 4.13068 11.4778 3.6999C11.4769 3.31272 11.3934 2.92459 11.2238 2.57584C10.8619 1.81084 10.0997 1.25162 9.25922 1.14568C8.5111 1.03881 7.72547 1.29006 7.17469 1.80662ZM1.13532 18.8462C1.11469 18.9962 1.14047 19.1471 1.19954 19.2863L1.21219 19.2858C1.33219 19.4958 1.56094 19.6374 1.8061 19.6257C4.63125 19.628 7.45641 19.6271 10.282 19.6257C10.2431 19.509 10.2066 19.3922 10.1723 19.2746C9.70313 17.5946 10.027 15.7144 11.0447 14.296C11.8838 13.1002 13.1789 12.2372 14.6063 11.9246C15.0788 11.8238 15.563 11.7765 16.0463 11.7896C15.8747 9.89865 15.6989 8.00818 15.5255 6.11725C15.0436 6.11772 14.5617 6.11725 14.0798 6.11771C13.5881 6.11678 13.0964 6.11818 12.6052 6.11678C12.5995 6.4674 12.6094 6.81803 12.6005 7.16865C12.5948 7.4649 12.3188 7.71943 12.023 7.70209C11.7417 7.69928 11.4895 7.45459 11.482 7.17287C11.4736 6.82131 11.482 6.46928 11.4783 6.11771C9.76969 6.11725 8.0611 6.11725 6.35204 6.11725C6.34875 6.46928 6.35766 6.82131 6.34829 7.17287C6.34032 7.44475 6.10688 7.68428 5.83547 7.70068C5.5336 7.73396 5.23969 7.4799 5.23078 7.17662C5.22047 6.82365 5.23079 6.47022 5.2261 6.11725C4.2525 6.11772 3.27938 6.11725 2.30579 6.11725C1.91532 10.3604 1.52579 14.603 1.13532 18.8462ZM14.5556 13.0979C13.2727 13.4616 12.1659 14.3907 11.5791 15.5879C11.0747 16.6008 10.9533 17.7962 11.2355 18.8916C11.5027 19.9468 12.1467 20.8993 13.0209 21.5471C13.7222 22.0707 14.5697 22.3974 15.442 22.4747C16.4719 22.569 17.5355 22.3257 18.4073 21.766L18.4167 21.7519C19.665 21.0066 20.5027 19.6322 20.6442 18.1894C20.8088 16.658 20.1811 15.0469 18.982 14.0719C17.8078 13.0126 16.0669 12.6568 14.5556 13.0979Z" fill="black"/>
<path d="M17.7289 15.9216C17.9436 15.7069 18.3298 15.721 18.5286 15.9502C18.7353 16.1644 18.7189 16.5385 18.4995 16.7377C17.5508 17.6494 16.6002 18.5588 15.6491 19.4677C15.4512 19.6772 15.0936 19.6997 14.878 19.5047C14.3375 19.0144 13.8012 18.5185 13.2645 18.0239C13.0677 17.8514 13.0194 17.5369 13.1614 17.3157C13.28 17.1169 13.528 17.0072 13.7548 17.0583C13.8955 17.0822 14.007 17.1778 14.1083 17.2721C14.4819 17.6185 14.8597 17.9602 15.2323 18.3075C16.0677 17.5153 16.8945 16.7147 17.7289 15.9216Z" fill="black"/>
<path d="M1.13544 18.8462C1.52591 14.6031 1.91544 10.3604 2.30591 6.11729C3.27951 6.11729 4.25263 6.11776 5.22623 6.11729C5.23091 6.47026 5.2206 6.8237 5.23091 7.17667C5.23982 7.47995 5.53373 7.73401 5.8356 7.70073C6.10701 7.68432 6.34044 7.44479 6.34841 7.17291C6.35779 6.82135 6.34888 6.46932 6.35216 6.11729C8.06122 6.11729 9.76982 6.11729 11.4784 6.11776C11.4822 6.46932 11.4737 6.82135 11.4822 7.17291C11.4897 7.45463 11.7418 7.69932 12.0231 7.70213C12.3189 7.71948 12.595 7.46495 12.6006 7.1687C12.6095 6.81807 12.5997 6.46745 12.6053 6.11682C13.0965 6.11823 13.5883 6.11682 14.08 6.11776C14.2478 8.0537 14.4404 9.98823 14.6064 11.9246C13.179 12.2373 11.8839 13.1003 11.0448 14.296C10.0272 15.7145 9.70326 17.5946 10.1725 19.2746C7.18607 19.2887 4.19873 19.2667 1.21232 19.2859L1.19966 19.2864C1.1406 19.1471 1.11482 18.9962 1.13544 18.8462Z" fill="#4CD964"/>
<path d="M14.0796 6.11772C14.5615 6.11725 15.0433 6.11772 15.5252 6.11725C15.6987 8.00819 15.8744 9.89865 16.046 11.7896C15.5627 11.7765 15.0785 11.8238 14.606 11.9246C14.4401 9.98819 14.2474 8.05365 14.0796 6.11772Z" fill="#4CD964"/>
<path d="M1.21191 19.2858C4.19832 19.2666 7.18566 19.2887 10.1721 19.2746C10.2063 19.3923 10.2429 19.509 10.2818 19.6257C7.45613 19.6271 4.63098 19.628 1.80582 19.6257C1.56066 19.6374 1.33191 19.4958 1.21191 19.2858Z" fill="#4CD964"/>
<path d="M14.5555 13.0979C16.0667 12.6568 17.8076 13.0126 18.9819 14.0719C19.0587 14.213 19.1539 14.3424 19.2547 14.4676C19.9531 15.4102 20.3201 16.5901 20.2883 17.7624C20.2611 19.1316 19.6794 20.4816 18.6973 21.4369C18.5937 21.5326 18.4892 21.6296 18.4165 21.7519L18.4072 21.766C17.5353 22.3257 16.4717 22.569 15.4419 22.4747C14.5695 22.3974 13.722 22.0707 13.0208 21.5471C12.1465 20.8993 11.5025 19.9468 11.2353 18.8916C10.9531 17.7961 11.0745 16.6008 11.5789 15.5879C12.1658 14.3907 13.2725 13.4616 14.5555 13.0979ZM17.7289 15.9216C16.8945 16.7147 16.0676 17.5154 15.2323 18.3076C14.8597 17.9602 14.4819 17.6185 14.1083 17.2721C14.007 17.1779 13.8955 17.0822 13.7548 17.0583C13.528 17.0072 13.28 17.1169 13.1614 17.3157C13.0194 17.5369 13.0676 17.8515 13.2645 18.024C13.8012 18.5185 14.3375 19.0144 14.878 19.5047C15.0936 19.6997 15.4512 19.6772 15.649 19.4677C16.6001 18.5588 17.5508 17.6494 18.4995 16.7377C18.7189 16.5385 18.7353 16.1644 18.5286 15.9502C18.3298 15.721 17.9436 15.7069 17.7289 15.9216Z" fill="#B9EA6A"/>
<path d="M18.9823 14.0719C20.1814 15.0469 20.809 16.658 20.6445 18.1894C20.5029 19.6322 19.6653 21.0066 18.417 21.7519C18.4896 21.6296 18.5942 21.5325 18.6978 21.4369C19.6798 20.4816 20.2615 19.1316 20.2887 17.7624C20.3206 16.59 19.9536 15.4102 19.2551 14.4675C19.1543 14.3424 19.0592 14.213 18.9823 14.0719Z" fill="#B9EA6A"/>
<circle cx="16" cy="18" r="4" fill="#B9EA6A"/>
<path d="M14 18H18M16 20V16" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const notification = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 21H15" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.26875 10.4998C5.26875 9.61584 5.44286 8.74054 5.78113 7.92387C6.11941 7.10719 6.61523 6.36515 7.24029 5.74009C7.86534 5.11504 8.60739 4.61922 9.42406 4.28094C10.2407 3.94266 11.116 3.76855 12 3.76855C12.884 3.76855 13.7593 3.94266 14.5759 4.28094C15.3926 4.61922 16.1347 5.11504 16.7597 5.74009C17.3848 6.36515 17.8806 7.10719 18.2189 7.92387C18.5571 8.74054 18.7312 9.61584 18.7312 10.4998V10.4998C18.7312 13.8561 19.4344 15.8061 20.0531 16.8748C20.1188 16.9886 20.1535 17.1177 20.1536 17.2491C20.1537 17.3806 20.1193 17.5097 20.0538 17.6237C19.9883 17.7376 19.894 17.8323 19.7803 17.8983C19.6667 17.9644 19.5377 17.9993 19.4062 17.9998H4.59375C4.46232 17.9993 4.33332 17.9644 4.21967 17.8983C4.10603 17.8323 4.01172 17.7376 3.94621 17.6237C3.8807 17.5097 3.84627 17.3806 3.84639 17.2491C3.84651 17.1177 3.88116 16.9886 3.94687 16.8748C4.56562 15.8061 5.26875 13.8561 5.26875 10.4998Z" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.1937 2.25C18.7208 3.21395 19.9533 4.57938 20.7562 6.19687" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.24375 6.19687C4.04674 4.57938 5.2792 3.21395 6.80625 2.25" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const noNotification = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 3.75L19.5 20.25" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 21H15" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.67188 3.88137C9.69819 3.29198 10.8634 2.98772 12.0469 3.00012C15.7594 3.02825 18.7313 6.11262 18.7313 9.8345V10.5001C18.7313 13.0032 19.125 14.7189 19.575 15.872" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4562 18H4.59368C4.46087 18.0005 4.3303 17.9657 4.21532 17.8992C4.10035 17.8327 4.0051 17.7369 3.93931 17.6215C3.87351 17.5062 3.83954 17.3754 3.84086 17.2426C3.84218 17.1098 3.87874 16.9797 3.94681 16.8656C4.56556 15.8062 5.26868 13.8562 5.26868 10.5V9.75C5.26791 8.37786 5.68304 7.0377 6.45931 5.90625" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const app=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2V5M16 2V5M3.5 9.09H20.5M19.49 19.05H16.51M18 17.59V20.58M18 23C19.0609 23 20.0783 22.5786 20.8284 21.8284C21.5786 21.0783 22 20.0609 22 19C22 17.9391 21.5786 16.9217 20.8284 16.1716C20.0783 15.4214 19.0609 15 18 15C16.9391 15 15.9217 15.4214 15.1716 16.1716C14.4214 16.9217 14 17.9391 14 19C14 20.0609 14.4214 21.0783 15.1716 21.8284C15.9217 22.5786 16.9391 23 18 23Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 8.5V16.36C20.27 15.53 19.2 15 18 15C15.79 15 14 16.79 14 19C14 19.75 14.21 20.46 14.58 21.06C14.79 21.42 15.06 21.74 15.37 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9949 13.7H12.0049M8.29395 13.7H8.30395M8.29395 16.7H8.30395" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`