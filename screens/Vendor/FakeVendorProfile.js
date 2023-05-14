import React, { useEffect } from "react";
import ProfileSkeleton from "../../components/ProfileSkeleton";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import ActivityLoader from "../../components/ActivityLoader";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

export default function FakeVendorProfile({ navigation, route }) {
  const colorMode = "light";
  const isFocused = useIsFocused();
  useEffect(() => {}, []);
  useEffect(() => {
    
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ActivityLoader />
    </View>
  );
}

const Gap = ({ height, width }) => (
  <View style={{ height: height, width: width }} />
);
const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 20,
  },
});
