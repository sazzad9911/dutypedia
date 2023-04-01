import ReadMore from "@fawazahmed/react-native-read-more";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Input from "../../components/Input";
import { icon, styles } from "./BusinessTitle";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  convertDate,
  serverTimeToLocal,
  serverTimeToLocalDate,
} from "../../action";
import IconButton from "../../components/IconButton";
import customStyle from "../../assets/stylesheet";
import TextOp from "./TextOp";
import ViewMore from "../../Hooks/ViewMore";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";

export default function NewPricing({ navigation, route }) {
  const businessForm=useSelector(state=>state.businessForm)
  const dispatch=useDispatch()
  const isFocused=useIsFocused()
  const [price, setPrice] = useState(businessForm?.price);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const data = route?.params?.data;
  const [priceError,setPriceError]=useState()
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 24,
            paddingHorizontal: 20,
          }}>
          <SvgXml width={"100%"} xml={vectorImage} />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginTop: 36,
            }}>
            <SvgXml
              style={{
                marginRight: 8,
              }}
              xml={icon}
            />
            <Text style={[styles.headLine, { flex: 1 }]}>
              Tips for set up the price
            </Text>
          </View>

          <ViewMore view={true}
            style={{
              marginTop: 24,
            }}
            lowHeight={77}
            width={167}
            position={{
              bottom: 0,
            }}
            height={layoutHeight}
            component={
              <View
                onLayout={(e) => setLayoutHeight(e.nativeEvent.layout.height)}
                style={{ width: "100%" }}>
                <TextOp
                  style={{ marginTop: 0, minHeight: 0 }}
                  number={"1."}
                  text={"Determine your value and research market rates."}
                />
                <TextOp
                  style={{ marginTop: 5, minHeight: 20 }}
                  number={"2."}
                  text={
                    "Consider your target audience and set a starting fee that is competitive but not undervaluing your services."
                  }
                />
                <TextOp
                  style={{ marginTop: 5, minHeight: 20 }}
                  number={"3."}
                  text={
                    "Communicate your starting fee clearly to potential buyers, and explain any additional charges based on the scope of the project."
                  }
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  number={"4."}
                  text={
                    "Allow for flexibility in your pricing based on the specific needs of each buyer."
                  }
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  number={"5."}
                  text={
                    "Regularly evaluate and adjust your pricing strategy to remain competitive in the market."
                  }
                />
              </View>
            }
          />

          <Text style={[styles.headLine, { marginTop: 36 }]}>
            Starting price
          </Text>
          <Input error={priceError}

            value={price}
            onChange={setPrice}
            keyboardType={"number-pad"}
            style={styles.input}
            placeholder={"00.00 ৳"}
          />
          <Text style={styles.text}>Minimum 50.00 ৳ </Text>
          <IconButton
            disabled={price ? false : true}
            active={price ? true : false}
            onPress={() => {
              if(parseInt(price)<50){
                setPriceError("*Minimum 50 taka required")
                return
              }
              dispatch({ type: "PRICE", playload: price });
              navigation.navigate("Skills", {
                data: {
                  serviceCenterName: data.serviceCenterName,
                  providerName: data.providerName,
                  gender: data.gender,
                  position: data.position,
                  numberOfTeam: data.numberOfTeam,
                  established: data.established,
                  workingTime: data.workingTime,
                  fullTime: data.fullTime,
                  price: price,
                },
              });
            }}
            style={styles.button}
            title={"Continue"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const vectorImage = `<svg width="353" height="230" viewBox="0 0 353 230" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M272.963 78.2927L220.474 112.386C219.385 113.093 218.936 114.484 219.467 115.503L234.058 143.547C234.588 144.567 235.892 144.819 236.981 144.112L289.469 110.018C290.559 109.311 291.008 107.92 290.476 106.901L275.885 78.8572C275.356 77.8365 274.052 77.5856 272.963 78.2927Z" fill="#87DECD"/>
<path d="M254.972 122.477C260.516 122.477 265.011 117.429 265.011 111.202C265.011 104.975 260.516 99.9266 254.972 99.9266C249.427 99.9266 244.932 104.975 244.932 111.202C244.932 117.429 249.427 122.477 254.972 122.477Z" fill="#37C8AB"/>
<path d="M273.136 103.561C275.17 103.561 276.819 101.708 276.819 99.4235C276.819 97.1386 275.17 95.2864 273.136 95.2864C271.101 95.2864 269.452 97.1386 269.452 99.4235C269.452 101.708 271.101 103.561 273.136 103.561Z" fill="#37C8AB"/>
<path d="M236.807 127.117C238.842 127.117 240.491 125.265 240.491 122.98C240.491 120.695 238.842 118.843 236.807 118.843C234.773 118.843 233.124 120.695 233.124 122.98C233.124 125.265 234.773 127.117 236.807 127.117Z" fill="#37C8AB"/>
<path d="M259.26 111.017C259.549 111.579 259.678 112.168 259.649 112.784C259.624 113.398 259.428 113.993 259.061 114.569C258.843 114.911 258.571 115.229 258.242 115.523C258.134 115.62 258.956 116.735 258.812 117.014C258.557 117.509 257.958 117.892 257.456 117.892C257.173 117.807 256.755 116.508 256.611 116.57C256.12 116.78 255.65 116.886 255.203 116.883C254.698 116.878 254.221 116.746 253.771 116.485C253.324 116.218 252.998 115.888 252.796 115.495C252.679 115.266 252.648 115.028 252.705 114.777C252.763 114.52 252.901 114.319 253.12 114.178C253.296 114.063 253.478 114.03 253.663 114.079C253.852 114.126 254.054 114.245 254.269 114.439C254.526 114.666 254.766 114.839 254.988 114.96C255.215 115.078 255.472 115.131 255.761 115.117C256.048 115.1 256.372 114.975 256.733 114.74C257.231 114.418 257.567 114.028 257.742 113.57C257.919 113.105 257.908 112.679 257.709 112.29C257.55 111.981 257.338 111.787 257.071 111.707C256.806 111.62 256.513 111.612 256.194 111.684C255.878 111.753 255.469 111.874 254.966 112.049C254.292 112.278 253.699 112.419 253.19 112.473C252.683 112.52 252.218 112.441 251.796 112.236C251.376 112.024 251.028 111.649 250.752 111.113C250.49 110.601 250.38 110.066 250.424 109.509C250.468 108.951 250.705 108.315 250.945 107.903C251.185 107.491 251.614 107.154 251.749 107.045C251.775 107.024 251.195 105.945 251.074 105.607C250.898 105.055 252.418 104.242 252.6 104.728C252.716 105.039 253.255 106.031 253.321 106.04C253.576 105.963 253.749 105.902 253.951 105.86C254.396 105.758 254.801 105.746 255.166 105.825C255.53 105.899 255.835 106.028 256.081 106.212C256.326 106.397 256.512 106.612 256.638 106.857C256.753 107.08 256.786 107.33 256.737 107.604C256.689 107.872 256.559 108.074 256.349 108.211C256.157 108.335 255.983 108.378 255.828 108.337C255.673 108.291 255.475 108.182 255.232 108.014C254.901 107.761 254.581 107.606 254.27 107.548C253.956 107.486 253.568 107.606 253.1 107.908C252.668 108.189 252.373 108.523 252.216 108.912C252.062 109.294 252.061 109.635 252.215 109.935C252.311 110.121 252.439 110.252 252.599 110.328C252.758 110.405 252.942 110.44 253.151 110.435C253.359 110.431 253.558 110.402 253.747 110.353C253.938 110.303 254.246 110.21 254.673 110.074C255.203 109.894 255.693 109.755 256.145 109.659C256.601 109.561 257.016 109.532 257.387 109.572C257.763 109.61 258.108 109.744 258.422 109.974C258.741 110.202 259.019 110.547 259.26 111.017Z" fill="white"/>
<path d="M253.957 66.3794L211.114 114.569C210.225 115.567 210.111 117.042 210.859 117.873L231.415 140.72C232.162 141.551 233.48 141.415 234.368 140.415L277.21 92.2254C278.1 91.2255 278.213 89.7522 277.466 88.9208L256.91 66.0744C256.163 65.2431 254.845 65.3796 253.957 66.3794Z" fill="#87DECD"/>
<path d="M258.992 90.8775C261.027 90.8775 262.676 89.0253 262.676 86.7404C262.676 84.4555 261.027 82.6033 258.992 82.6033C256.958 82.6033 255.309 84.4555 255.309 86.7404C255.309 89.0253 256.958 90.8775 258.992 90.8775Z" fill="#37C8AB"/>
<path d="M229.332 124.191C231.366 124.191 233.015 122.339 233.015 120.054C233.015 117.769 231.366 115.917 229.332 115.917C227.297 115.917 225.648 117.769 225.648 120.054C225.648 122.339 227.297 124.191 229.332 124.191Z" fill="#37C8AB"/>
<path d="M248.261 101.972C248.67 102.43 248.931 102.962 249.044 103.566C249.161 104.166 249.109 104.797 248.888 105.46C248.756 105.853 248.566 106.239 248.316 106.62C248.234 106.746 249.284 107.582 249.209 107.895C249.078 108.447 248.586 108.992 248.102 109.137C247.809 109.137 247.107 108.004 246.981 108.106C246.555 108.453 246.126 108.69 245.693 108.818C245.205 108.96 244.713 108.969 244.218 108.849C243.723 108.721 243.334 108.497 243.048 108.176C242.882 107.99 242.797 107.768 242.795 107.508C242.792 107.243 242.879 107.01 243.058 106.81C243.202 106.648 243.37 106.563 243.56 106.557C243.754 106.547 243.976 106.603 244.228 106.727C244.529 106.873 244.801 106.971 245.044 107.023C245.289 107.071 245.551 107.047 245.827 106.95C246.101 106.85 246.384 106.634 246.679 106.303C247.084 105.848 247.319 105.373 247.384 104.88C247.449 104.38 247.339 103.971 247.057 103.654C246.832 103.402 246.583 103.277 246.306 103.277C246.03 103.269 245.745 103.348 245.454 103.509C245.164 103.668 244.798 103.904 244.352 104.217C243.753 104.634 243.214 104.944 242.735 105.143C242.255 105.337 241.789 105.396 241.334 105.319C240.88 105.237 240.457 104.976 240.067 104.538C239.696 104.121 239.467 103.636 239.381 103.085C239.294 102.533 239.377 101.85 239.514 101.383C239.651 100.915 239.988 100.465 240.092 100.32C240.113 100.292 239.303 99.4186 239.109 99.1272C238.811 98.6451 240.092 97.4177 240.38 97.8346C240.564 98.1015 241.313 98.9046 241.38 98.8923C241.608 98.7435 241.761 98.6352 241.946 98.5356C242.351 98.3081 242.74 98.179 243.112 98.147C243.481 98.1126 243.806 98.1482 244.085 98.2552C244.364 98.3622 244.593 98.5159 244.771 98.7164C244.935 98.8996 245.023 99.1309 245.039 99.41C245.054 99.683 244.975 99.9155 244.803 100.109C244.647 100.284 244.488 100.375 244.329 100.383C244.169 100.383 243.952 100.336 243.68 100.243C243.302 100.094 242.956 100.037 242.643 100.072C242.326 100.102 241.978 100.332 241.597 100.76C241.243 101.158 241.036 101.566 240.975 101.986C240.914 102.401 240.991 102.731 241.21 102.975C241.345 103.127 241.5 103.216 241.671 103.245C241.843 103.272 242.029 103.253 242.229 103.188C242.428 103.123 242.614 103.038 242.786 102.935C242.958 102.831 243.235 102.652 243.615 102.396C244.085 102.069 244.527 101.792 244.942 101.568C245.361 101.341 245.754 101.192 246.122 101.123C246.493 101.051 246.857 101.08 247.213 101.212C247.571 101.336 247.92 101.589 248.261 101.972Z" fill="white"/>
<path d="M239.733 66.1975L130.721 66.4299C130.721 66.4299 130.255 170.827 130.255 208.931C130.255 216.326 134.689 230 151.926 230L218.251 229.985C235.786 229.982 239.734 215.446 239.734 207.936C239.733 165.274 239.733 66.1975 239.733 66.1975Z" fill="#002255"/>
<path d="M239.478 200.803L130.466 200.57C130.466 200.57 130 96.1729 130 58.0693C130 50.6744 134.435 37 151.671 37L217.996 37.0148C235.531 37.0184 239.48 51.5537 239.48 59.0642C239.478 101.727 239.478 200.803 239.478 200.803Z" fill="#002255"/>
<path d="M220.598 4.20212C212.216 13.1306 209.938 -3.39449 202.821 2.08191C188.816 12.8601 188.113 -0.917627 180.798 0.0490136C175.158 0.794286 169.956 11.7114 164.604 6.00258C155.886 -3.29734 153.606 5.21919 147.93 6.17476C147.93 6.17476 147.605 23.2103 147.605 47.7206C147.605 52.4776 150.696 51.9352 162.71 51.9352L205.625 51.9254C217.846 51.9229 220.598 51.9119 220.598 47.0799C220.598 19.6376 220.598 4.20212 220.598 4.20212Z" fill="#E6E6E6"/>
<path d="M157.492 37.245L180.555 37.4147C181.356 37.4208 181.989 36.5354 181.977 35.431L181.974 35.1961C181.962 34.0917 181.308 33.1976 180.508 33.1915L157.445 33.0218C156.645 33.0156 156.012 33.9011 156.024 35.0055L156.026 35.2404C156.038 36.346 156.692 37.2401 157.492 37.245Z" fill="#002255"/>
<path d="M157.402 22.3777L165.653 22.449C166.454 22.4564 167.087 21.5697 167.075 20.4653L167.072 20.2304C167.06 19.126 166.405 18.2319 165.606 18.2258L157.355 18.1545C156.555 18.1471 155.922 19.0338 155.934 20.1382L155.936 20.3731C155.948 21.4787 156.602 22.3715 157.402 22.3777Z" fill="#002255"/>
<path d="M190.612 37.5648L200.215 37.6361C201.016 37.6423 201.649 36.7568 201.637 35.6524L201.634 35.4175C201.622 34.3131 200.967 33.4191 200.168 33.4129L190.565 33.3416C189.764 33.3354 189.131 34.2209 189.144 35.3253L189.146 35.5602C189.158 36.6646 189.813 37.5586 190.612 37.5648Z" fill="#002255"/>
<path d="M176.143 22.3776L194.463 22.449C195.264 22.4527 195.897 21.5696 195.885 20.4653L195.882 20.2304C195.87 19.126 195.216 18.2282 194.416 18.2258L176.095 18.1544C175.295 18.1507 174.662 19.0338 174.674 20.1381L174.676 20.373C174.688 21.4786 175.342 22.3752 176.143 22.3776Z" fill="#002255"/>
<path d="M222.218 66.6377L147.557 66.709C146.009 66.7103 144.767 68.0422 144.773 69.6938L144.96 115.133C144.966 116.786 146.219 118.114 147.767 118.113L222.429 118.042C223.977 118.041 225.219 116.709 225.212 115.057L225.026 69.6176C225.02 67.9659 223.768 66.6365 222.218 66.6377Z" fill="#F7C560"/>
<path d="M165.878 130.991L146.092 131.009C145.681 131.009 145.353 131.362 145.354 131.8L145.403 143.842C145.405 144.28 145.737 144.632 146.148 144.632L165.934 144.613C166.344 144.613 166.673 144.26 166.672 143.823L166.623 131.78C166.62 131.342 166.289 130.989 165.878 130.991Z" fill="white"/>
<path d="M195.134 130.991L175.349 131.009C174.938 131.009 174.609 131.362 174.611 131.8L174.66 143.842C174.662 144.28 174.994 144.632 175.404 144.632L195.19 144.613C195.601 144.613 195.929 144.26 195.928 143.823L195.879 131.78C195.877 131.342 195.545 130.989 195.134 130.991Z" fill="white"/>
<path d="M224.39 130.991L204.604 131.009C204.193 131.009 203.865 131.362 203.866 131.8L203.915 143.842C203.917 144.28 204.249 144.632 204.66 144.632L224.446 144.613C224.856 144.613 225.185 144.26 225.184 143.823L225.134 131.78C225.132 131.342 224.8 130.989 224.39 130.991Z" fill="white"/>
<path d="M165.878 154.79L146.092 154.809C145.681 154.809 145.353 155.162 145.354 155.599L145.403 167.642C145.405 168.08 145.737 168.431 146.148 168.431L165.934 168.413C166.344 168.413 166.673 168.06 166.672 167.622L166.623 155.58C166.62 155.142 166.289 154.789 165.878 154.79Z" fill="white"/>
<path d="M195.134 154.79L175.349 154.809C174.938 154.809 174.609 155.162 174.611 155.599L174.66 167.642C174.662 168.08 174.994 168.431 175.404 168.431L195.19 168.413C195.601 168.413 195.929 168.06 195.928 167.622L195.879 155.58C195.877 155.142 195.545 154.789 195.134 154.79Z" fill="white"/>
<path d="M224.39 154.79L204.604 154.809C204.193 154.809 203.865 155.162 203.866 155.599L203.915 167.642C203.917 168.08 204.249 168.431 204.66 168.431L224.446 168.413C224.856 168.413 225.185 168.06 225.184 167.622L225.134 155.58C225.132 155.142 224.8 154.789 224.39 154.79Z" fill="white"/>
<path d="M165.878 178.59L146.092 178.608C145.681 178.608 145.353 178.961 145.354 179.399L145.403 191.441C145.405 191.879 145.737 192.231 146.148 192.231L165.934 192.212C166.344 192.212 166.673 191.86 166.672 191.422L166.623 179.379C166.62 178.941 166.289 178.588 165.878 178.59Z" fill="white"/>
<path d="M195.134 178.59L175.349 178.608C174.938 178.608 174.609 178.961 174.611 179.399L174.66 191.441C174.662 191.879 174.994 192.231 175.404 192.231L195.19 192.212C195.601 192.212 195.929 191.86 195.928 191.422L195.879 179.379C195.877 178.941 195.545 178.588 195.134 178.59Z" fill="white"/>
<path d="M224.39 178.59L204.604 178.608C204.193 178.608 203.865 178.961 203.866 179.399L203.915 191.441C203.917 191.879 204.249 192.231 204.66 192.231L224.446 192.212C224.856 192.212 225.185 191.86 225.184 191.422L225.134 179.379C225.132 178.941 224.8 178.588 224.39 178.59Z" fill="white"/>
<path d="M165.878 202.389L146.092 202.408C145.681 202.408 145.353 202.761 145.354 203.199L145.403 215.241C145.405 215.679 145.737 216.03 146.148 216.03L165.934 216.012C166.344 216.012 166.673 215.659 166.672 215.221L166.623 203.179C166.62 202.741 166.289 202.388 165.878 202.389Z" fill="#FF7180"/>
<path d="M195.134 202.389L175.349 202.408C174.938 202.408 174.609 202.761 174.611 203.199L174.66 215.241C174.662 215.679 174.994 216.03 175.404 216.03L195.19 216.012C195.601 216.012 195.929 215.659 195.928 215.221L195.879 203.179C195.877 202.741 195.545 202.388 195.134 202.389Z" fill="#F7C560"/>
<path d="M224.39 202.389L204.604 202.408C204.193 202.408 203.865 202.761 203.866 203.199L203.915 215.241C203.917 215.679 204.249 216.03 204.66 216.03L224.446 216.012C224.856 216.012 225.185 215.659 225.184 215.221L225.134 203.179C225.132 202.741 224.8 202.388 224.39 202.389Z" fill="#87DECD"/>
<path d="M202.38 75.7975C201.692 75.8209 201.037 76.1443 200.556 76.699L178.611 101.346L169.437 85.154C168.937 84.576 168.25 84.2513 167.533 84.2513C165.151 84.2525 163.976 87.5042 165.684 89.3698L175.968 107.518C175.971 107.522 175.974 107.524 175.976 107.528C176.402 108.314 177.127 108.834 177.941 108.939C178.754 109.043 179.566 108.72 180.139 108.063L204.309 80.916C205.094 80.0588 205.329 78.7491 204.903 77.6164C204.477 76.4837 203.474 75.7606 202.38 75.7975Z" fill="white"/>
<path d="M146.403 55.7871L223.18 55.8892C224.339 55.8904 225.257 54.6163 225.239 53.0151L225.234 52.6744C225.216 51.0744 224.269 49.772 223.11 49.7696L146.333 49.6675C145.175 49.6663 144.256 50.9404 144.275 52.5416L144.279 52.8822C144.298 54.4822 145.245 55.7846 146.403 55.7871Z" fill="#FF7180"/>
<path d="M196.294 164.332L288.078 164.423C289.982 164.425 291.509 166.123 291.5 168.23L291.271 226.174C291.263 228.281 289.723 229.975 287.82 229.974L196.036 229.883C194.131 229.882 192.605 228.183 192.614 226.077L192.842 168.132C192.849 166.025 194.39 164.33 196.294 164.332Z" fill="#5599FF"/>
<path d="M282.243 173.319L273.449 173.384C272.319 173.392 271.396 174.588 271.379 176.065L271.271 185.59C271.254 187.067 272.15 188.249 273.28 188.241L282.074 188.176C283.204 188.168 284.127 186.972 284.144 185.495L284.252 175.97C284.27 174.492 283.373 173.31 282.243 173.319Z" fill="#FF7180"/>
<path d="M253.752 184.201L211.411 184.385C210.55 184.388 209.868 183.439 209.881 182.25L209.884 181.997C209.898 180.808 210.602 179.844 211.462 179.84L253.803 179.657C254.664 179.653 255.346 180.603 255.333 181.792L255.33 182.044C255.317 183.232 254.612 184.198 253.752 184.201Z" fill="#002255"/>
<path d="M281.984 196.79L269.887 196.878C268.875 196.886 268.048 197.957 268.033 199.28L268.03 199.562C268.014 200.885 268.817 201.944 269.83 201.937L281.927 201.848C282.938 201.841 283.765 200.77 283.78 199.446L283.784 199.165C283.798 197.841 282.995 196.782 281.984 196.79Z" fill="white"/>
<path d="M259.275 196.957L247.178 197.046C246.167 197.053 245.34 198.124 245.324 199.447L245.321 199.729C245.306 201.052 246.109 202.111 247.121 202.104L259.218 202.015C260.23 202.008 261.057 200.937 261.072 199.613L261.075 199.332C261.091 198.009 260.288 196.95 259.275 196.957Z" fill="white"/>
<path d="M236.568 197.124L224.471 197.213C223.459 197.22 222.632 198.291 222.617 199.615L222.614 199.896C222.598 201.22 223.401 202.278 224.414 202.271L236.511 202.183C237.522 202.175 238.349 201.104 238.364 199.781L238.368 199.499C238.382 198.176 237.579 197.117 236.568 197.124Z" fill="white"/>
<path d="M213.859 197.292L201.763 197.38C200.751 197.388 199.924 198.459 199.909 199.782L199.906 200.064C199.89 201.387 200.693 202.446 201.706 202.438L213.803 202.35C214.814 202.343 215.641 201.271 215.656 199.948L215.66 199.666C215.674 198.343 214.871 197.284 213.859 197.292Z" fill="white"/>
<path d="M212.497 215.83C212.481 217.252 211.948 218.618 211.014 219.63C210.079 220.642 208.822 221.215 207.518 221.225C204.801 221.245 202.627 218.863 202.661 215.903C202.695 212.944 204.923 210.528 207.64 210.507C208.944 210.497 210.189 211.053 211.1 212.051C212.01 213.049 212.513 214.408 212.497 215.83Z" fill="#F7C560"/>
<path d="M115.935 27.2834H80.2344C75.3922 27.2834 71.4929 31.6616 71.4929 37.1011V77.197C71.4929 82.6353 75.3911 87.0147 80.2344 87.0147H102.508L111.97 96.2974L112.942 87.0147H115.935C120.777 87.0147 124.677 82.6365 124.677 77.197V37.1011C124.677 31.6616 120.777 27.2834 115.935 27.2834Z" fill="#FF7180"/>
<path d="M89.0758 43.351L120.524 43.4432C121.118 43.4444 121.63 44.2143 121.67 45.1699C121.711 46.1254 121.264 46.8941 120.669 46.8916L89.2215 46.7994C88.6269 46.7982 88.1155 46.0283 88.075 45.0727C88.0345 44.1171 88.4812 43.3485 89.0758 43.351Z" fill="white"/>
<path d="M76.9374 54.1747L96.6312 54.2116C97.2258 54.2128 97.7372 54.9827 97.7777 55.9383C97.8182 56.8938 97.3714 57.6612 96.7768 57.66L77.083 57.6231C76.4884 57.6219 75.977 56.852 75.9365 55.8964C75.896 54.9421 76.3428 54.1735 76.9374 54.1747Z" fill="white"/>
<path d="M86.7556 64.45L118.203 64.5422C118.798 64.5434 119.309 65.3133 119.35 66.2689C119.39 67.2244 118.944 67.9931 118.349 67.9906L86.9012 67.8984C86.3067 67.8972 85.7953 67.1273 85.7548 66.1717C85.7142 65.2161 86.161 64.4475 86.7556 64.45Z" fill="white"/>
<path d="M127.67 181.064C127.67 182.079 127.435 182.991 126.967 183.801C126.505 184.61 125.825 185.243 124.928 185.701C124.395 185.972 123.803 186.164 123.153 186.275C122.938 186.312 123.277 188.543 122.887 188.795C122.197 189.242 121.118 189.234 120.439 188.794C120.114 188.428 120.454 186.303 120.215 186.26C119.402 186.115 118.694 185.844 118.088 185.448C117.408 184.998 116.855 184.399 116.427 183.65C116.006 182.895 115.795 182.162 115.795 181.453C115.795 181.041 115.921 180.689 116.172 180.4C116.431 180.102 116.757 179.954 117.151 179.954C117.471 179.954 117.739 180.068 117.956 180.297C118.18 180.526 118.371 180.865 118.526 181.316C118.717 181.85 118.921 182.298 119.138 182.656C119.363 183.015 119.675 183.312 120.076 183.548C120.477 183.777 121.003 183.892 121.656 183.892C122.553 183.892 123.28 183.659 123.837 183.193C124.401 182.72 124.684 182.132 124.684 181.429C124.684 180.872 124.53 180.422 124.225 180.078C123.926 179.727 123.535 179.459 123.052 179.276C122.577 179.093 121.937 178.898 121.136 178.692C120.062 178.409 119.161 178.082 118.434 177.707C117.714 177.326 117.14 176.81 116.712 176.161C116.29 175.504 116.08 174.691 116.08 173.722C116.08 172.799 116.305 171.978 116.752 171.26C117.2 170.542 117.965 169.89 118.577 169.543C119.189 169.196 120.005 169.118 120.264 169.086C120.315 169.08 120.279 167.108 120.351 166.545C120.496 165.641 123.122 165.876 123.029 166.695C122.97 167.219 123.007 169.037 123.093 169.108C123.492 169.226 123.768 169.297 124.07 169.418C124.743 169.67 125.3 170.009 125.743 170.437C126.184 170.857 126.507 171.299 126.711 171.765C126.914 172.232 127.016 172.685 127.016 173.128C127.016 173.533 126.887 173.899 126.628 174.228C126.377 174.549 126.061 174.708 125.68 174.708C125.333 174.708 125.068 174.613 124.885 174.422C124.709 174.224 124.515 173.903 124.304 173.46C124.032 172.827 123.706 172.335 123.325 171.983C122.944 171.624 122.333 171.444 121.489 171.444C120.708 171.444 120.076 171.639 119.593 172.029C119.118 172.41 118.879 172.872 118.879 173.413C118.879 173.749 118.96 174.039 119.123 174.284C119.286 174.529 119.511 174.738 119.795 174.914C120.081 175.09 120.369 175.226 120.662 175.326C120.954 175.425 121.437 175.571 122.109 175.761C122.952 175.983 123.713 176.227 124.392 176.494C125.079 176.761 125.659 177.086 126.136 177.467C126.619 177.848 126.992 178.333 127.257 178.921C127.534 179.504 127.67 180.217 127.67 181.064Z" fill="white"/>
<path d="M100.361 142.525C100.361 143.082 100.232 143.583 99.9747 144.027C99.7206 144.471 99.3483 144.819 98.8556 145.07C98.5632 145.218 98.238 145.324 97.881 145.385C97.7627 145.404 97.9489 146.629 97.7343 146.768C97.3554 147.014 96.7641 147.009 96.3907 146.768C96.2122 146.568 96.3983 145.402 96.2669 145.378C95.8213 145.298 95.4326 145.15 95.0997 144.933C94.7263 144.686 94.4229 144.358 94.1875 143.947C93.9565 143.532 93.8404 143.13 93.8404 142.74C93.8404 142.514 93.9094 142.321 94.0473 142.162C94.1886 141.999 94.3682 141.918 94.5839 141.918C94.7591 141.918 94.9069 141.98 95.0263 142.106C95.1489 142.231 95.2541 142.418 95.3395 142.665C95.4435 142.958 95.5563 143.204 95.6756 143.401C95.7983 143.598 95.9702 143.761 96.1903 143.89C96.4104 144.016 96.6995 144.078 97.0575 144.078C97.5503 144.078 97.9489 143.951 98.2544 143.695C98.5643 143.435 98.7187 143.113 98.7187 142.727C98.7187 142.421 98.6344 142.173 98.4668 141.985C98.3026 141.792 98.088 141.646 97.823 141.545C97.5624 141.444 97.2108 141.337 96.7717 141.224C96.1826 141.069 95.6888 140.89 95.2891 140.684C94.8938 140.475 94.5784 140.192 94.3441 139.836C94.1131 139.475 93.997 139.029 93.997 138.497C93.997 137.991 94.1196 137.541 94.366 137.147C94.6124 136.754 95.0318 136.396 95.3679 136.205C95.7041 136.014 96.152 135.971 96.2932 135.954C96.3206 135.951 96.3009 134.87 96.3414 134.56C96.4213 134.064 97.8624 134.192 97.812 134.642C97.7792 134.93 97.8 135.927 97.8471 135.967C98.0661 136.032 98.2183 136.07 98.3836 136.136C98.7526 136.274 99.0581 136.461 99.3012 136.696C99.5432 136.926 99.7206 137.169 99.8323 137.425C99.944 137.681 99.9999 137.929 99.9999 138.173C99.9999 138.395 99.9287 138.596 99.7874 138.775C99.6494 138.951 99.4764 139.04 99.2673 139.04C99.0768 139.04 98.9311 138.987 98.8315 138.882C98.734 138.773 98.6278 138.597 98.5128 138.355C98.3639 138.007 98.1843 137.737 97.9763 137.544C97.7671 137.348 97.432 137.249 96.9689 137.249C96.5396 137.249 96.1936 137.356 95.9286 137.57C95.668 137.779 95.5366 138.033 95.5366 138.33C95.5366 138.515 95.5815 138.673 95.6713 138.807C95.7611 138.941 95.8837 139.057 96.0403 139.153C96.1969 139.249 96.3556 139.325 96.5155 139.379C96.6754 139.433 96.9404 139.513 97.3094 139.618C97.7715 139.74 98.1898 139.874 98.5621 140.02C98.9388 140.166 99.2574 140.345 99.5191 140.554C99.7841 140.763 99.9889 141.03 100.135 141.352C100.286 141.669 100.361 142.06 100.361 142.525Z" fill="white"/>
<path d="M81.1652 202.106C81.1652 202.923 80.9769 203.657 80.5991 204.309C80.2268 204.96 79.6804 205.47 78.9577 205.839C78.5284 206.058 78.0521 206.212 77.5287 206.3C77.3557 206.33 77.6283 208.125 77.3141 208.328C76.7589 208.688 75.8905 208.682 75.3441 208.328C75.0824 208.034 75.3562 206.323 75.1634 206.289C74.5097 206.172 73.9392 205.955 73.4519 205.636C72.9044 205.273 72.4588 204.791 72.1149 204.19C71.7755 203.581 71.6057 202.992 71.6057 202.42C71.6057 202.088 71.7065 201.805 71.9091 201.573C72.1171 201.333 72.3799 201.214 72.6964 201.214C72.9537 201.214 73.1694 201.306 73.3446 201.49C73.5253 201.675 73.6786 201.948 73.8045 202.311C73.9578 202.741 74.1221 203.1 74.2973 203.389C74.478 203.678 74.7298 203.918 75.0518 204.107C75.3748 204.292 75.7986 204.384 76.3231 204.384C77.0447 204.384 77.6305 204.197 78.0784 203.822C78.5328 203.441 78.7595 202.969 78.7595 202.403C78.7595 201.954 78.6368 201.592 78.3904 201.316C78.1495 201.033 77.8353 200.818 77.4465 200.671C77.0633 200.524 76.5497 200.367 75.9037 200.201C75.0397 199.974 74.3148 199.71 73.729 199.409C73.1497 199.102 72.6865 198.688 72.3427 198.165C72.0032 197.636 71.8335 196.982 71.8335 196.202C71.8335 195.459 72.0142 194.799 72.3755 194.221C72.7369 193.643 73.3512 193.118 73.844 192.838C74.3367 192.559 74.9937 192.495 75.2018 192.471C75.2423 192.466 75.2138 190.879 75.2718 190.427C75.389 189.699 77.5024 189.888 77.4279 190.547C77.3798 190.969 77.4104 192.433 77.4794 192.489C77.8013 192.584 78.0236 192.642 78.2656 192.738C78.8077 192.941 79.2555 193.214 79.6114 193.558C79.9673 193.896 80.2268 194.252 80.391 194.627C80.5553 195.002 80.6374 195.367 80.6374 195.724C80.6374 196.05 80.5334 196.345 80.3253 196.608C80.1228 196.866 79.8687 196.995 79.5621 196.995C79.2829 196.995 79.0694 196.919 78.9226 196.765C78.7803 196.605 78.6248 196.347 78.4551 195.992C78.2361 195.481 77.9733 195.085 77.6677 194.803C77.3611 194.514 76.8695 194.37 76.1906 194.37C75.562 194.37 75.0528 194.526 74.6641 194.839C74.2809 195.147 74.0903 195.518 74.0903 195.955C74.0903 196.225 74.156 196.459 74.2874 196.655C74.4188 196.851 74.5995 197.02 74.8295 197.161C75.0594 197.303 75.2916 197.413 75.527 197.493C75.7624 197.573 76.1501 197.69 76.6921 197.844C77.3699 198.022 77.9831 198.219 78.5295 198.434C79.0825 198.649 79.5501 198.91 79.9322 199.218C80.321 199.525 80.621 199.915 80.8345 200.388C81.0557 200.85 81.1652 201.424 81.1652 202.106Z" fill="white"/>
<path d="M277.204 40.1658L272.669 36.1886L275.67 32.7156L277.395 33.7228L277.204 40.1658Z" fill="#4ADE80"/>
<path d="M259.556 21.0728L268.4 43.1997L282.693 29.5192L259.556 21.0728Z" fill="#4ADE80"/>
<path d="M272.712 31.1857L268.4 43.1998L282.693 29.5193L272.712 31.1857Z" fill="#4ADE80"/>
<path d="M259.556 21.0728L279.292 32.2309L277.205 40.1658L276.312 35.5797L259.556 21.0728Z" fill="#4ADE80"/>
<circle cx="97" cy="140" r="7" fill="#F7C560"/>
<path d="M97.1024 151.995C102.708 151.995 107.252 146.891 107.252 140.596C107.252 134.3 102.708 129.196 97.1024 129.196C91.4969 129.196 86.9528 134.3 86.9528 140.596C86.9528 146.891 91.4969 151.995 97.1024 151.995Z" fill="#F7C560"/>
<path d="M97.102 150.091C101.771 150.091 105.557 145.84 105.557 140.596C105.557 135.351 101.771 131.1 97.102 131.1C92.4327 131.1 88.6474 135.351 88.6474 140.596C88.6474 145.84 92.4327 150.091 97.102 150.091Z" fill="#F7C560"/>
<path d="M93.4251 134.12C93.6861 132.8 95.7188 132.601 96.3179 133.767C96.4977 135.029 96.4078 136.311 96.4035 137.581C99.1467 137.581 101.894 137.577 104.637 137.59C104.641 137.872 104.646 138.44 104.65 138.727C101.903 138.723 99.1552 138.727 96.4121 138.723C96.4549 140.499 96.2752 142.288 96.4977 144.056C97.1396 146.06 100.452 146.164 101.449 144.392C101.684 143.786 101.59 143.126 101.624 142.495C100.52 142.848 99.0439 143.359 98.1838 142.267C97.1824 141.2 98.6032 139.764 99.8185 139.901C102.065 140.125 103.867 142.79 102.788 144.832C101.239 147.608 96.2752 147.422 95.1026 144.433C94.7003 142.562 94.9785 140.628 94.9143 138.731C93.9514 138.723 92.9928 138.723 92.03 138.719C92.0214 138.436 92.0086 137.868 92 137.586C92.9672 137.586 93.9386 137.581 94.91 137.577C94.9057 136.892 94.9057 136.204 94.8972 135.515C94.3494 135.141 93.4293 134.917 93.4251 134.12Z" fill="#F3F6F9" stroke="white" stroke-width="0.5"/>
<path d="M121.731 198.322C131.946 198.322 140.227 189.022 140.227 177.549C140.227 166.077 131.946 156.776 121.731 156.776C111.516 156.776 103.235 166.077 103.235 177.549C103.235 189.022 111.516 198.322 121.731 198.322Z" fill="#F7C560"/>
<path d="M121.731 194.853C130.24 194.853 137.138 187.106 137.138 177.549C137.138 167.993 130.24 160.246 121.731 160.246C113.222 160.246 106.324 167.993 106.324 177.549C106.324 187.106 113.222 194.853 121.731 194.853Z" fill="#F7C560"/>
<circle cx="122.5" cy="178.5" r="13.5" fill="#F7C560"/>
<path d="M111.5 165.54C112.022 162.901 116.088 162.502 117.286 164.835C117.645 167.358 117.466 169.923 117.457 172.463C122.943 172.463 128.438 172.455 133.924 172.479C133.933 173.044 133.941 174.181 133.95 174.754C128.455 174.745 122.96 174.754 117.474 174.745C117.56 178.298 117.2 181.876 117.645 185.412C118.929 189.421 125.554 189.628 127.548 186.084C128.019 184.872 127.83 183.552 127.899 182.291C125.691 182.996 122.738 184.017 121.018 181.834C119.015 179.701 121.856 176.829 124.287 177.103C128.78 177.551 132.384 182.88 130.227 186.964C127.129 192.517 117.2 192.143 114.855 186.167C114.051 182.423 114.607 178.555 114.479 174.762C112.553 174.745 110.636 174.745 108.71 174.737C108.693 174.173 108.667 173.036 108.65 172.471C110.584 172.471 112.527 172.463 114.47 172.455C114.461 171.085 114.461 169.707 114.444 168.329C113.349 167.582 111.509 167.134 111.5 165.54Z" fill="#F3F6F9" stroke="white" stroke-width="0.5"/>
<path d="M244.162 114.672C249.706 114.672 254.201 109.624 254.201 103.397C254.201 97.1701 249.706 92.1221 244.162 92.1221C238.617 92.1221 234.122 97.1701 234.122 103.397C234.122 109.624 238.617 114.672 244.162 114.672Z" fill="#37C8AB"/>
<ellipse cx="245" cy="102.5" rx="7" ry="7.5" fill="#37C8AB"/>
<path d="M236.601 106.582C235.394 105.989 235.727 103.974 237.009 103.697C238.274 103.85 239.489 104.268 240.715 104.601C241.425 101.952 242.132 99.2967 242.854 96.6503C243.128 96.7192 243.678 96.8622 243.956 96.9322C243.241 99.5849 242.534 102.24 241.82 104.888C243.547 105.307 245.228 105.943 246.993 106.186C249.096 106.085 250.053 102.912 248.599 101.49C248.075 101.106 247.413 101.026 246.813 100.83C246.868 101.988 246.979 103.546 245.702 104.094C244.412 104.786 243.393 103.042 243.84 101.903C244.638 99.7909 247.678 98.7403 249.371 100.31C251.652 102.525 250.187 107.272 246.997 107.631C245.085 107.535 243.289 106.766 241.44 106.337C241.183 107.265 240.935 108.191 240.682 109.12C240.407 109.055 239.854 108.921 239.579 108.856C239.83 107.922 240.077 106.982 240.325 106.043C239.662 105.87 238.997 105.691 238.329 105.521C237.826 105.954 237.372 106.784 236.601 106.582Z" fill="#F3F6F9" stroke="white" stroke-width="0.5"/>
<rect x="233" y="93" width="6.7" height="20" fill="#002255"/>
<path d="M76.3856 215.995C84.6067 215.995 91.2713 208.51 91.2713 199.277C91.2713 190.043 84.6067 182.558 76.3856 182.558C68.1645 182.558 61.5 190.043 61.5 199.277C61.5 208.51 68.1645 215.995 76.3856 215.995Z" fill="#F7C560"/>
<path d="M77.3999 212.853C84.2482 212.853 89.7999 206.618 89.7999 198.927C89.7999 191.235 84.2482 185 77.3999 185C70.5516 185 65 191.235 65 198.927C65 206.618 70.5516 212.853 77.3999 212.853Z" fill="#F7C560"/>
<path d="M70.9151 190.542C71.2659 188.725 73.9976 188.451 74.8028 190.056C75.0443 191.794 74.9235 193.559 74.9178 195.308C78.6042 195.308 82.2963 195.302 85.9827 195.319C85.9885 195.708 85.9942 196.491 86 196.885C82.3078 196.879 78.6157 196.885 74.9293 196.879C74.9868 199.325 74.7453 201.788 75.0443 204.222C75.907 206.982 80.3583 207.125 81.6982 204.685C82.0145 203.85 81.888 202.942 81.934 202.073C80.4503 202.559 78.4662 203.262 77.3102 201.759C75.9645 200.29 77.8738 198.313 79.5071 198.502C82.5264 198.81 84.9476 202.479 83.4983 205.29C81.4164 209.113 74.7453 208.856 73.1695 204.742C72.6289 202.165 73.0027 199.502 72.9164 196.891C71.6225 196.879 70.3342 196.879 69.0403 196.873C69.0288 196.485 69.0115 195.702 69 195.313C70.2997 195.313 71.6052 195.308 72.9107 195.302C72.9049 194.359 72.9049 193.411 72.8934 192.462C72.1573 191.948 70.9208 191.639 70.9151 190.542Z" fill="#F3F6F9" stroke="white" stroke-width="0.5"/>
</svg>
`;
const dateIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75 4V6.25M18.25 4V6.25M4 19.75V8.5C4 7.90326 4.23705 7.33097 4.65901 6.90901C5.08097 6.48705 5.65326 6.25 6.25 6.25H19.75C20.3467 6.25 20.919 6.48705 21.341 6.90901C21.7629 7.33097 22 7.90326 22 8.5V19.75M4 19.75C4 20.3467 4.23705 20.919 4.65901 21.341C5.08097 21.7629 5.65326 22 6.25 22H19.75C20.3467 22 20.919 21.7629 21.341 21.341C21.7629 20.919 22 20.3467 22 19.75M4 19.75V12.25C4 11.6533 4.23705 11.081 4.65901 10.659C5.08097 10.2371 5.65326 10 6.25 10H19.75C20.3467 10 20.919 10.2371 21.341 10.659C21.7629 11.081 22 11.6533 22 12.25V19.75M13 13.75H13.008V13.758H13V13.75ZM13 16H13.008V16.008H13V16ZM13 18.25H13.008V18.258H13V18.25ZM10.75 16H10.758V16.008H10.75V16ZM10.75 18.25H10.758V18.258H10.75V18.25ZM8.5 16H8.508V16.008H8.5V16ZM8.5 18.25H8.508V18.258H8.5V18.25ZM15.25 13.75H15.258V13.758H15.25V13.75ZM15.25 16H15.258V16.008H15.25V16ZM15.25 18.25H15.258V18.258H15.25V18.25ZM17.5 13.75H17.508V13.758H17.5V13.75ZM17.5 16H17.508V16.008H17.5V16Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
