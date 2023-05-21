import React from "react";
import { StyleSheet, View, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
const { width, height } = Dimensions.get("window");

export default function ChatSkeleton() {
  const colorMode = "light";
  //const colors = ["#F3F3F3", "#505050"];
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <View
        transition={{
          type: "timing",
        }}
        style={[styles.container, styles.padded]}
        animate={{ backgroundColor: "#ffffff" }}>
        <Gap height={24} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={15}
            width={7}
          />
          <Gap width={20} />
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={30}
            width={30}
          />
          <Gap width={8} />
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={17}
            width={114}
          />
        </View>
        <Gap height={20}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            alignSelf:"flex-end"
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            alignSelf:"flex-start"
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            alignSelf:"flex-end"
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            alignSelf:"flex-start"
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            alignSelf:"flex-end"
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
           
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            alignSelf:"flex-end"
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            alignSelf:"flex-end"
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
        <Gap height={16}/>
        <View
          style={{
            width: "70%",
            padding: 8,
            backgroundColor:"#EFF8F4",
            borderRadius:12,
            
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={12}
            width={86}
          />
          <Gap height={12}/>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={14}
            width={131}
          />
          <Gap height={14}/>
          <View style={{
            alignItems:"flex-end",
            marginBottom:3
          }}>
          <Skeleton
            //colors={colors}
            colorMode={colorMode}
            radius="round"
            height={10}
            width={51}
          />
          </View>
        </View>
      </View>
    </SafeAreaView>
   
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
    overflow:"hidden"
  },
  padded: {
    paddingHorizontal: 20,
  },
});
