import React from "react";
import { ScrollView, View,TouchableOpacity,Text, StyleSheet, Dimensions } from "react-native";
import customStyle from "../assets/stylesheet";
import { TopSellerCard } from "../components/LandingPage/TopSeller";
const {width,height}=Dimensions.get("window")

export default function ServiceScreen({onMore}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[
          customStyle.flexBox,
          { marginTop: 0, marginBottom: 18, marginHorizontal: 28 },
        ]}>
        <Text style={customStyle.landingHeadLine}>Top Seller</Text>
        <TouchableOpacity onPress={onMore}>
          <Text style={customStyle.landingButtonText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        marginHorizontal:22,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center",
        marginBottom:22
      }}>
        <TopSellerCard height={130} style={styles.card} width={(width/2-34)}/>
        <TopSellerCard height={130} style={styles.card} width={(width/2-34)}/>
        <TopSellerCard height={130} style={styles.card} width={(width/2-34)}/>
        <TopSellerCard height={130} style={styles.card} width={(width/2-34)}/>
        <TopSellerCard height={130} style={styles.card} width={(width/2-34)}/>
        <TopSellerCard height={130} style={styles.card} width={(width/2-34)}/>
      </View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
    card:{
        marginVertical:14
    }
})