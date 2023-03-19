import { AntDesign } from "@expo/vector-icons";
import React,{useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable
} from "react-native";
import { SvgXml } from "react-native-svg";
import customStyle from "../../assets/stylesheet";
import Avatar from "../Avatar";
const { width, height } = Dimensions.get("window");

export default function Trending({onMore}) {
  return (
    <View style={{marginBottom:14}}>
      <View
        style={[
          customStyle.flexBox,
          { marginTop: 34, marginBottom: 18, marginHorizontal: 28 },
        ]}>
        <Text style={customStyle.landingHeadLine}>All time trending</Text>
        <TouchableOpacity onPress={onMore}>
          <Text style={customStyle.landingButtonText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={{ width: 22 }} />
        <TrendingCart />
        <TrendingCart />
        <TrendingCart />
        <TrendingCart />
        <View style={{ width: 22 }} />
      </ScrollView>
    </View>
  );
}
export const TrendingCart = () => {
  const [like, setLike] = useState(false);

  return (
    <Pressable style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://www.cleansweepofamerica.com/wp-content/uploads/2020/10/office-cleaning-service.jpeg",
          }}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setLike((t) => !t)}>
          <AntDesign
            name={like ? "heart" : "hearto"}
            size={16}
            color={like ? "red" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.lineBox}>
        <Text style={styles.headLine} numberOfLines={2}>
          devlop,customize web app and fix bug using vue js,p and other things{" "}
        </Text>
        <View
          style={[
            customStyle.flexBox,
            { marginTop: 8, justifyContent: "space-between" },
          ]}>
          <View
            style={{
              flexDirection: "row",
              flex: 2,
            }}>
            <View>
              <Avatar
                style={styles.avatar}
                source={{
                  uri: "https://media.istockphoto.com/id/1375264815/photo/beautiful-afro-woman.jpg?b=1&s=170667a&w=0&k=20&c=V052sAKDF76elxBGk2ozB0hxafANXLjVmBNKFfPTdTY=",
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <Text style={styles.smallText} numberOfLines={1}>
                Easin Arafat It consulting center
              </Text>
              <Text style={styles.mediumText} numberOfLines={1}>
                Easin Arafat It consulting center
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }} />
          <View
            style={{
              
              alignItems: "center",
            }}>
            <View style={styles.chipContainer}>
              <SvgXml width={"8"} xml={star} />
              <Text style={styles.chipText}>5.0</Text>
            </View>
            <Text style={styles.hugeText}>50000৳</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width -80,
    borderColor: "#F1EFEF",
    borderWidth: 1,
    margin: 6,
    borderTopLeftRadius: 12,
    borderTopRightRadius:12,
    borderBottomLeftRadius:12,
    borderBottomRightRadius:12,
    overflow: "hidden",
  },
  image: {
    width: width -80,
    height: 160,
  },
  lineBox: {
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  headLine: {
    fontSize: 14,
    fontWeight: "500",
  },
  avatar: {
    height: 32,
    width: 32,
    marginRight: 8,
  },
  chipContainer: {
    flexDirection: "row",
    backgroundColor: "#2BDE73",
    paddingVertical: 2,
    borderRadius: 25,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 45,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
    color: "white",
  },
  smallText: {
    fontSize: 12,
    color: "#767676",
    fontWeight: "400",
  },
  mediumText: {
    fontSize: 14,
    color: "#767676",
    fontWeight: "500",
  },
  hugeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  icon: {
    padding: 4,
    backgroundColor: "rgba(43, 222, 115, 0.1)",
    position: "absolute",
    borderRadius: 12,
    width: 24,
    height: 24,
    top: 8,
    right: 8,
  },
});
const star = `<svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.69105 0.505462L5.39498 1.74751C5.49097 1.9204 5.74694 2.08625 5.96291 2.118L7.23877 2.30501C8.05468 2.42498 8.24666 2.94721 7.65873 3.46237L6.66684 4.33745C6.49885 4.48565 6.40686 4.77146 6.45886 4.97611L6.74283 6.05937C6.9668 6.91681 6.45086 7.24849 5.59095 6.80037L4.39509 6.17582C4.17911 6.0629 3.82315 6.0629 3.60317 6.17582L2.40731 6.80037C1.5514 7.24849 1.03146 6.91328 1.25543 6.05937L1.5394 4.97611C1.5914 4.77146 1.49941 4.48565 1.33143 4.33745L0.339535 3.46237C-0.2444 2.94721 -0.0564207 2.42498 0.759489 2.30501L2.03535 2.118C2.24732 2.08625 2.5033 1.9204 2.59929 1.74751L3.30321 0.505462C3.68717 -0.168487 4.3111 -0.168487 4.69105 0.505462Z" fill="white"/>
</svg>
`;