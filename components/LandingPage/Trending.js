import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React,{useEffect, useState} from "react";
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
import { useDispatch, useSelector } from "react-redux";
import customStyle from "../../assets/stylesheet";
import { getLikeGigs, getRating, getTrendingServices, setLikeGigs } from "../../Class/service";
import { getJson, storeData, storeJson } from "../../Class/storage";
import { setSaveList } from "../../Reducers/saveList";
import ActivityLoader from "../ActivityLoader";
import Avatar from "../Avatar";
const { width, height } = Dimensions.get("window");

export default function Trending({onMore,navigation,refresh}) {
  const [data,setData]=useState()
  useEffect(()=>{
    fetchData()
    getData()
  },[refresh])
  const getData = async () => {
    try {
      const { data } = await getTrendingServices();
      setData(data?.gigs);
      await storeJson("trending",data?.gigs)
      //console.log(data?.gigs[0])
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchData = async () => {
    try {
      const data = await getJson("trending");
      setData(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <View style={{marginBottom:14}}>
      <View
        style={[
          customStyle.flexBox,
          { marginTop: 34, marginBottom: 18, marginHorizontal: 20 },
        ]}>
        <Text style={customStyle.landingHeadLine}>All time trending</Text>
        <TouchableOpacity onPress={()=>onMore(data)}>
          <Text style={customStyle.landingButtonText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={{ width: 14 }} />
        {data&&data.map((doc,i)=>(
          <TrendingCart data={doc} onPress={() => {
            navigation?.navigate("OtherProfile", {
              serviceId: doc?.service?.id,
              data: doc,
            });
          }} key={i} />
        ))}
       {!data && (
          <View style={[customStyle.fullBox, { height: 220 }]}>
            <ActivityLoader />
          </View>
        )}
        {data && data.length == 0 && (
          <View style={[customStyle.fullBox, { height: 220 }]}>
            <Text style={customStyle.mediumText}>No Service!</Text>
          </View>
        )}
        <View style={{ width: 14 }} />
      </ScrollView>
    </View>
  );
}
export const TrendingCart = ({data,onPress}) => {
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(0);
  const saveList = useSelector((state) => state.saveList);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    getRating(data?.id).then((res) => {
      setRating(res.data.rating);
    });
  }, []);
  useEffect(() => {
    //console.log(data)
    let arr = saveList?.filter((d) => d.gig.id == data?.id);
    if (arr?.length > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [saveList?.length]);
  useEffect(() => {
    if (!user.token) {
      setLike(false);
    }
  }, [user]); 
  const addToSaveList = async () => {
    if (!data) {
      return;
    }
    const res = await setLikeGigs(user.token, data.id);
    //console.log(res.data)
    const response = await getLikeGigs(user.token);
    //console.log(response.data.gigs)
    dispatch(setSaveList(response.data.gigs));
  };
  
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: data
              ? data.images[0]
              : "https://www.cleansweepofamerica.com/wp-content/uploads/2020/10/office-cleaning-service.jpeg",
          }}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            if (!user.token) {
              navigation.navigate("LogIn");
              return;
            }
            addToSaveList();
            setLike((t) => !t);
          }}>
          <AntDesign
            name={like ? "heart" : "hearto"}
            size={16}
            color={like ? "red" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.lineBox}>
        <Text style={styles.headLine} numberOfLines={2}>
        {data
            ? data.title
            : "devlop,customize web app and fix bug using vue js,p and other things"}
        </Text>
        <View
          style={[
            customStyle.flexBox,
            { marginTop: 8, justifyContent: "space-between",alignItems:"flex-end" },
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
                  uri: data
                    ? data.service.profilePhoto
                    : "https://media.istockphoto.com/id/1375264815/photo/beautiful-afro-woman.jpg?b=1&s=170667a&w=0&k=20&c=V052sAKDF76elxBGk2ozB0hxafANXLjVmBNKFfPTdTY=",
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <Text style={styles.smallText} numberOfLines={1}>
              {data
                  ? `${data.service.providerInfo.name}`
                  : "Easin Arafat It consulting center"}
              </Text>
              <Text style={styles.mediumText} numberOfLines={1}>
              {data
                  ? data.service.serviceCenterName
                  : "Easin Arafat It consulting center"}
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
              <Text style={styles.chipText}>{rating > parseInt(rating) ? rating : `${rating}.0`}</Text>
            </View>
            <Text style={styles.hugeText}>{data ? data.price : "00"}৳</Text>
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
    flex:1
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