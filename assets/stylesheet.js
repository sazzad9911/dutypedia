import { StyleSheet } from "react-native";

const customStyle = StyleSheet.create({
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      x: 1,
      y: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 5,
  },
  mediumText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  largeFont: {
    fontSize: 24,
    fontWeight: "600",
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    flex:1
  },
  landingHeadLine: {
    fontSize: 24,
    fontWeight: "700",
    color: "#484848",
  },
  landingButtonText: {
    color: "#00B22D",
    fontSize: 16,
  },
  fullBox:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  flex:{
    flexDirection:"row",
  }
});
export default customStyle;
