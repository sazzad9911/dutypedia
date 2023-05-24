import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import customStyle from "../../assets/stylesheet";
import { AntDesign } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import {
  getLikeGigs,
  getPopularServices,
  getRating,
  getStartingServices,
  setLikeGigs,
} from "../../Class/service";
import { useDispatch, useSelector } from "react-redux";
import { setSaveList } from "../../Reducers/saveList";
import { getData, getJson, storeData, storeJson } from "../../Class/storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ActivityLoader from "../ActivityLoader";

export default function PopularCategory({ onMore, navigation,refresh }) {
  const [data, setData] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData();
    store();
  }, [refresh]);
  const store = async () => {
    try {
      const { data } = await getPopularServices();
      setData(data?.gigs);
      //console.log(data?.gigs)
      storeJson("popular_category",data?.gigs);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchData = async () => {
    try {
      const data = await getJson("popular_category");
      setData(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 20,
      }}>
      <View style={[customStyle.flexBox, { marginTop: 20, marginBottom: 8 }]}>
        <Text style={customStyle.landingHeadLine}>Popular Category</Text>
        <TouchableOpacity
          onPress={() => {
            onMore(data);
          }}>
          <Text style={styles.buttonText}>See all</Text>
        </TouchableOpacity>
      </View>
      {data &&
        data?.slice(0, 3).map((doc, i) => (
          <Card
            onPress={() => {
              navigation?.navigate("OtherProfile", {
                serviceId: doc?.service?.id,
                data: doc,
              });
            }}
            data={doc}
            key={i}
            style={
              i == 2
                ? {
                    borderBottomWidth: 0,
                    paddingBottom: 0,
                  }
                : null
            }
          />
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
    </View>
  );
}
export const Card = ({ style, data, onPress }) => {
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(0);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const saveList = useSelector((state) => state.saveList);
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
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={{
          uri: data
            ? data.images[0]
            : "https://www.usan.com/wp-content/uploads/2013/09/customer-self-service.jpg",
        }}
      />
      <View style={{ flex: 1, marginLeft: 7 }}>
        <View style={[customStyle.flexBox]}>
          <View
            style={{
              flex: 7,
            }}>
            <Text numberOfLines={2} style={[styles.headLine]}>
              {data
                ? data.title
                : "I will give you best it service & best support"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!user.token) {
                navigation.navigate("LogIn");
                return;
              }
              addToSaveList();
              setLike((t) => !t);
            }}>
            <AntDesign
              style={{
                marginLeft: 20,
                flex: 1,
              }}
              color={like ? "red" : "#A3A3A3"}
              name={like ? "heart" : "hearto"}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={[customStyle.flexBox]}>
          <Text style={[styles.smallText, { flex: 1 }]} numberOfLines={1}>
          {data
                  ? `${data?.service?.providerInfo?.name}`
                  : "Easin Arafat It consulting center"}
          </Text>
          <View
            style={{
              height: 12,
              width: 1,
              backgroundColor: "#E6E6E6",
              marginHorizontal: 10,
            }}
          />
          <Text style={[styles.smallText, { flex: 2 }]} numberOfLines={1}>
            {data
              ? data.service.serviceCenterName
              : "Easin arafat it consulting service is the most powerful"}
          </Text>
        </View>
        <View style={customStyle.flexBox}>
          <View style={styles.chipContainer}>
            <SvgXml width={"12"} xml={star} />
            <Text style={styles.chipText}>
              {rating > parseInt(rating) ? rating : `${rating}.0`}
            </Text>
          </View>
          <Text style={styles.hugeText}>{data ? data.price : "00"}৳</Text>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    color: "#00B22D",
    fontSize: 16,
  },
  container: {
    paddingVertical: 16,
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#F1EFEF",
  },
  image: {
    height: 92,
    width: 95,
    borderRadius: 20,
  },
  headLine: {
    fontSize: 16,
    fontWeight: "500",
  },
  flexBox: {
    flexDirection: "row",
  },
  smallText: {
    fontSize: 12,
    color: "#767676",
    flex: 1,
  },
  chipContainer: {
    flexDirection: "row",
    backgroundColor: "#2BDE73",
    paddingVertical: 4,
    borderRadius: 25,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
    color: "white",
  },
  hugeText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
const star = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.86642 1.75482L7.74642 3.51482C7.86642 3.75982 8.18642 3.99482 8.45642 4.03982L10.0514 4.30482C11.0714 4.47482 11.3114 5.21482 10.5764 5.94482L9.33642 7.18482C9.12642 7.39482 9.01142 7.79983 9.07642 8.08983L9.43142 9.62483C9.71142 10.8398 9.06642 11.3098 7.99142 10.6748L6.49642 9.78983C6.22642 9.62983 5.78142 9.62983 5.50642 9.78983L4.01142 10.6748C2.94142 11.3098 2.29142 10.8348 2.57142 9.62483L2.92642 8.08983C2.99142 7.79983 2.87642 7.39482 2.66642 7.18482L1.42642 5.94482C0.696419 5.21482 0.931419 4.47482 1.95142 4.30482L3.54642 4.03982C3.81142 3.99482 4.13142 3.75982 4.25142 3.51482L5.13142 1.75482C5.61142 0.799824 6.39142 0.799824 6.86642 1.75482Z" fill="white"/>
</svg>
`;
