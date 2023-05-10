import React from "react";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ReceiptSkeleton() {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        height:"100%",
        overflow:"hidden"
      }}>
      <MotiView
        transition={{
          type: "timing",
        }}
        style={{
          paddingTop: inset?.top,
          width: "100%",
        }}
        animate={{ backgroundColor: "#ffffff" }}>
        <View
          style={{
            marginTop: 32,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
          }}>
          <Skeleton colorMode={"light"} radius="round" height={60} width={60} />
          <View
            style={{
              marginLeft: 27,
            }}>
            <Skeleton colorMode={"light"} height={13} width={99} />
            <Gap height={10} />
            <Skeleton colorMode={"light"} height={13} width={83} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row",
            }}>
            <Skeleton
              colorMode={"light"}
              radius="round"
              height={20}
              width={20}
            />
            <Gap width={16} />
            <Skeleton
              colorMode={"light"}
              radius="round"
              height={20}
              width={20}
            />
          </View>
        </View>
        <Gap height={36} />
        <View style={{ alignItems: "center" }}>
          <Skeleton colorMode={"light"} height={13} width={115} />
        </View>
        <Gap height={36} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
          }}>
          <View>
            <Skeleton colorMode={"light"} height={13} width={155} />
            <Gap height={12} />
            <Skeleton colorMode={"light"} height={13} width={122} />
          </View>
          <View>
            <Skeleton
              colorMode={"light"}
              radius={"round"}
              height={36}
              width={130}
            />
            <Gap height={12} />
            <Skeleton colorMode={"light"} height={12} width={130} />
          </View>
        </View>
        <Gap height={36} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}>
          <Skeleton colorMode={"light"} height={17} width={168} />
          <Gap height={16} />
          <Skeleton colorMode={"light"} height={14} width={268} />
          <Gap height={4} />
          <Skeleton colorMode={"light"} height={14} width={175} />
        </View>
        <Gap height={36} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}>
          <Skeleton colorMode={"light"} height={13} width={297} />
          <Gap height={4} />
          <Skeleton colorMode={"light"} height={13} width={196} />
          <Gap height={4} />
          <Skeleton colorMode={"light"} height={13} width={262} />
          <Gap height={4} />
          <Skeleton colorMode={"light"} height={13} width={243} />
          <Gap height={4} />
          <Skeleton colorMode={"light"} height={13} width={238} />
        </View>
        <Gap height={36} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}>
          <Skeleton colorMode={"light"} height={17} width={125} />
          <Gap height={12} />
          <Skeleton colorMode={"light"} height={13} width={335} />
        </View>
        <Gap height={36} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            alignItems: "center",
          }}>
          <Skeleton colorMode={"light"} height={17} width={46} />
          <Gap height={20} />
          <View
            style={{
              width: 184,
              flexDirection: "row",
              justifyContent: "space-between",
             
            }}>
            <View>
              <Skeleton colorMode={"light"} height={13} width={64} />
              <Gap height={12} />
              <Skeleton colorMode={"light"} height={13} width={73} />
              <Gap height={12} />
              <Skeleton colorMode={"light"} height={17} width={82} />
            </View>
            <View style={{
                alignItems:"flex-end"
            }}>
              <Skeleton colorMode={"light"} height={13} width={49} />
              <Gap height={12} />
              <Skeleton colorMode={"light"} height={13} width={40} />
              <Gap height={12} />
              <Skeleton colorMode={"light"} height={17} width={70} />
            </View>
          </View>
        </View>
        <Gap height={36} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            alignItems:"center"
          }}>
          <Skeleton colorMode={"light"} height={17} width={115} />
        </View>
        <Gap height={20} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            alignItems:"center",
            flexDirection:"row",
            justifyContent:"center"
          }}>
          <Skeleton colorMode={"light"} height={13} width={90} />
          <Gap width={15}/>
          <Skeleton colorMode={"light"} height={13} width={16} />
          <Gap width={15}/>
          <Skeleton colorMode={"light"} height={13} width={90} />
        </View>
        <Gap height={36} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            alignItems:"center",
            justifyContent:"center"
          }}>
          <Skeleton colorMode={"light"} height={17} width={141} />
          <Gap height={20}/>
          <Skeleton colorMode={"light"} height={14} width={32} />
        </View>
        <Gap height={36} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}>
          <Skeleton colorMode={"light"} height={17} width={117} />
          <Gap height={12}/>
          <Skeleton colorMode={"light"} height={13} width={335} />
        </View>
        <Gap height={32}/>
      </MotiView>
    </View>
  );
}
const Gap = ({ height, width }) => {
  return <View style={{ height: height, width: width }} />;
};
