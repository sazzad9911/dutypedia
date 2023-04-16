import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import Input from "./../components/Input";
import Button from "./../components/Button";
const { width, height } = Dimensions.get("window");
import { userLogin } from "../Class/auth";
import { useSelector, useDispatch } from "react-redux";
import { getService, getDashboard } from "../Class/service";
import IconButton from "../components/IconButton";
import { SvgXml } from "react-native-svg";
import customStyle from "../assets/stylesheet";
import ActivityLoader from "../components/ActivityLoader";

const Login = ({ navigation }) => {
  const [Email, setEmail] = React.useState();
  const [Password, setPassword] = React.useState();
  const [EmailError, setEmailError] = React.useState();
  const [PasswordError, setPasswordError] = React.useState();
  const dispatch = useDispatch();
  const [loader,setLoader]=useState(false)
  const [error,setError]=useState()

  const login = () => {
    setEmailError(null);
    setPasswordError(null);
    if (!Email) {
      setEmailError("Username field is required");
      return;
    }
    if (!Password) {
      setEmailError("Password field is required");
      return;
    }
    setLoader(true)
    userLogin(Email, Password)
      .then((res) => {
        //console.log(res);
        if (res) {
          dispatch({ type: "SET_USER", playload: res });
          navigation.navigate("Feed");
          getDashboard(res.token).then((result) => {
            if (result && result.data && result.data.dashboards) {
              dispatch({
                type: "SET_VENDOR_INFO",
                playload: result.data.dashboards,
              });
              //setLoad(!load);
            } else {
              dispatch({ type: "SET_VENDOR_INFO", playload: false });
              //setLoad(!load);
            }
            setLoader(false)
          });
        }
      })
      .catch((err) => {
        setLoader(false)
        setEmailError(err?.response?.data?.msg)
        //console.warn(err.response.data.msg);
      });
  };
  if(loader){
    return(
      <View style={customStyle.fullBox}>
        <ActivityLoader/>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <SvgXml
            style={{
              marginTop: 24,
            }}
            width={"100%"}
            xml={icon}
          />
          <View
            style={{
              marginVertical: 72,
            }}>
            <Text style={styles.lebel}>Username</Text>
            <Input value={Email} onChange={setEmail} placeholder={" "} style={styles.input} />
            <View style={{ height: 20 }} />
            <Text style={styles.lebel}>Password</Text>
            <Input value={Password} onChange={setPassword} placeholder={" "} style={styles.input} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 8,
              }}>
              
                <Text
                style={[
                  styles.text,
                  { color: "#EC2700", flex: 1, textAlign: "left" },
                ]}>
                {EmailError}
              </Text>
            
              <Text style={[styles.text, { textDecorationLine: "underline" }]}>
                Forget id and password
              </Text>
            </View>
          </View>
          <IconButton onPress={login}
            active={true}
            style={[
              styles.button,
              {
                backgroundColor: "#4ADE80",
                color: "#ffffff",
              },
            ]}
            title={"Login"}
          />
          <View
            style={{
              flexDirection: "row",
              marginVertical: 16,
              alignItems: "center",
            }}>
            <View style={styles.line} />
            <Text style={styles.text}>or</Text>
            <View style={styles.line} />
          </View>
          <IconButton
            style={[styles.button, { marginBottom: 20 }]}
            title={"Create an account"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
        Log In
      </Text>
      <Input
        onChange={setEmail}
        error={EmailError}
        style={{
          borderWidth: 1,
          width: width - 40,
          marginLeft: 20,
        }}
        placeholder="Email"
      />
      <Input
        onChange={setPassword}
        error={PasswordError}
        style={{
          width: width - 40,
          marginLeft: 20,
          borderWidth: 1,
        }}
        placeholder="Password"
      />
      <IconButton
        onPress={login}
        style={{
          color: "black",
          borderRadius: 5,
          marginTop: 10,
          width: width - 40,
        }}
        title="LogIn"
      />
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  lebel: {
    fontSize: 16,
    fontWeight: "400",
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "400",
  },
  input: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F1F1F1",
    marginTop: 8,
    marginHorizontal: 0,
    borderBottomWidth: 0,
  },
  button: {
    borderColor: "#D1D1D1",
    height: 40,
    borderRadius: 4,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#F1F1F1",
  },
});
const icon = `<svg width="353" height="110" viewBox="0 0 353 110" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M110.267 17.3634L86.9657 21.344L87.6939 46.5547L88.422 47.8816L92.0628 52.5257L98.6162 57.8332L108.082 63.8041L111.723 65.131L121.917 59.16L132.111 49.8719L134.296 46.885V21.344L110.267 17.3634Z" fill="black"/>
<path d="M105.856 17.1716C107.525 16.8063 109.272 16.7536 110.989 16.7C112.379 16.719 113.774 16.7863 115.15 16.9735C116.676 17.2098 118.195 17.4843 119.725 17.7042C120.008 17.7878 120.317 17.7787 120.592 17.8805C120.953 17.9359 121.342 17.9214 121.68 18.065C121.745 18.0659 121.875 18.0668 121.941 18.0677L121.953 18.1704C122.375 18.1359 122.798 18.1904 123.209 18.2831C123.504 18.3949 123.835 18.3413 124.138 18.4303C128.058 19.0611 131.976 19.7072 135.896 20.3307C135.932 20.3498 136.002 20.3889 136.038 20.4088C136.016 29.3816 136.037 38.3553 136.028 47.329C136.074 47.4599 135.924 47.5271 135.834 47.588C134.02 50.1691 131.847 52.5247 129.501 54.7105C126.948 57.0507 124.194 59.2046 121.279 61.1549C118.689 62.8753 116.013 64.4903 113.227 65.928C112.535 66.4042 111.645 66.5678 110.796 66.4751C110.143 66.3461 109.462 66.2397 108.886 65.9062C106.349 64.6348 103.886 63.2243 101.514 61.7002C98.185 59.6063 95.0317 57.2633 92.2064 54.6114C90.1509 52.6811 88.2614 50.5808 86.784 48.2387C86.6042 47.9043 86.3344 47.598 86.2455 47.2309C86.2336 38.2499 86.2494 29.268 86.2375 20.288C86.8117 20.1626 87.4027 20.1108 87.9798 19.999C88.1547 19.9381 88.4185 20.0735 88.5361 19.9063C93.5217 19.1265 98.5032 18.3149 103.489 17.5243C104.276 17.4061 105.06 17.2507 105.856 17.1716ZM109.027 18.5521C107.026 18.6594 105.074 19.1129 103.098 19.3892C100.892 19.7518 98.6811 20.1108 96.4744 20.4679C93.7005 20.8942 90.9592 21.3813 88.1863 21.8039C88.1665 24.4358 88.1843 27.066 88.1804 29.6988C88.1814 35.4271 88.1665 41.1527 88.1883 46.8819C89.1093 48.4714 90.2724 49.941 91.5502 51.3051C94.0019 53.9361 96.8351 56.2454 99.8265 58.3457C102.914 60.4969 106.153 62.4691 109.534 64.2085C110.206 64.5957 111.025 64.8838 111.819 64.6575C112.062 64.423 112.421 64.3321 112.705 64.1458C114.595 63.1661 116.435 62.1028 118.209 60.9522C121.013 59.18 123.686 57.2342 126.203 55.1294C129.028 52.7201 131.653 50.0909 133.811 47.1491C134.086 46.9137 134.012 46.5492 134.012 46.2402C134.003 38.0981 134.017 29.9551 134.003 21.8112C129.523 21.0905 125.044 20.3625 120.563 19.64C120.008 19.5736 119.464 19.401 118.898 19.4364L118.857 19.351C118.725 19.3264 118.542 19.4064 118.44 19.2928C117.335 19.1301 116.234 18.9466 115.134 18.7539C113.114 18.5003 111.063 18.4522 109.027 18.5521Z" fill="#4ADE80"/>
<path d="M109.411 20.6343C110.3 20.5507 111.199 20.5807 112.092 20.5844C113.013 20.6516 113.951 20.6571 114.853 20.8497C115.392 20.9288 115.923 21.036 116.465 21.1024C116.856 21.1442 117.209 21.2914 117.608 21.2841C121.168 21.8622 124.732 22.4165 128.291 23C128.276 23.0254 128.245 23.0754 128.231 23.1C128.639 23.01 129.069 23.1163 129.474 23.1863C130.121 23.2672 130.758 23.4044 131.406 23.4817C131.444 30.944 131.408 38.409 131.424 45.8723C131.412 46.0222 131.461 46.2004 131.329 46.3167C128.321 49.9874 124.714 53.2074 120.882 56.142C117.755 58.4894 114.442 60.6197 111.065 62.6518C110.775 62.6636 110.536 62.4473 110.269 62.3601C109.57 62.0993 108.97 61.6739 108.33 61.3186C106.779 60.3625 105.224 59.411 103.753 58.3531C102.702 57.5552 101.59 56.829 100.516 56.0583C100.376 56.0284 100.394 55.8348 100.243 55.8584C100.247 55.713 100.043 55.7666 99.9785 55.6594C98.1741 54.3279 96.4516 52.9011 94.8043 51.4079C93.3634 50.1092 92.1302 48.6342 90.8969 47.171C90.7546 46.9565 90.5213 46.772 90.5026 46.5075C90.5115 38.8689 90.5124 31.2257 90.5026 23.5862C90.5273 23.5553 90.5777 23.4935 90.6024 23.4617C90.9739 23.4417 91.3366 23.3508 91.7092 23.3317C92.3841 23.1436 93.1055 23.1127 93.7953 22.9627C97.4606 22.3838 101.116 21.8013 104.783 21.2169C106.322 20.9988 107.845 20.6353 109.411 20.6343ZM92.6608 39.6387C92.642 39.6732 92.6055 39.7423 92.5877 39.7768C92.5996 41.2028 92.5897 42.6287 92.5926 44.0546C92.6173 44.1719 92.6371 44.29 92.6509 44.4091C92.6984 44.3455 92.7498 44.2846 92.8061 44.2273C94.3487 42.8432 95.8656 41.4345 97.3993 40.0422C97.421 39.8977 97.6187 39.9259 97.675 39.7932C102.577 35.3145 107.49 30.8468 112.386 26.3617L112.474 26.3626C112.498 26.2427 112.603 26.17 112.695 26.0918C113.744 25.1339 114.822 24.1524 115.884 23.1836C115.953 23.1154 116.067 23.0445 115.994 22.94C115.147 22.8146 114.31 22.6392 113.465 22.512C113.592 22.5029 113.722 22.4947 113.85 22.4865L113.844 22.4402C113.685 22.4402 113.526 22.4493 113.378 22.5038C112.747 22.4602 112.114 22.442 111.481 22.4474C105.22 28.1894 98.932 33.9068 92.6608 39.6387ZM99.7305 23.8816C97.344 24.2687 94.9555 24.6513 92.5571 24.9921C92.5343 25.1057 92.5254 25.2212 92.5284 25.3375C92.5393 27.6704 92.5156 30.0034 92.5403 32.3363C95.7559 29.4045 98.9636 26.4617 102.187 23.5389C101.358 23.5844 100.551 23.7789 99.7305 23.8816ZM122.899 24.1088C117.333 29.1982 111.747 34.2703 106.187 39.366C106.089 39.4851 105.874 39.5478 105.879 39.7187C105.853 39.7205 105.802 39.7259 105.776 39.7277C105.218 40.234 104.686 40.7683 104.095 41.2418C104.013 41.3554 103.916 41.4609 103.778 41.519C103.709 41.6208 103.625 41.8035 103.46 41.7581C103.457 41.7844 103.452 41.8362 103.45 41.8617C100.764 44.2937 98.1029 46.7466 95.4219 49.1822C95.4229 49.2095 95.4239 49.2649 95.4239 49.2922C96.2401 50.0792 97.0939 50.8335 97.9497 51.5842C100.184 49.5857 102.382 47.5454 104.603 45.5324C104.833 45.2843 105.08 45.0734 105.346 44.8544C108.205 42.2452 111.066 39.636 113.923 37.024C113.995 36.9386 114.155 36.8959 114.132 36.765C114.159 36.7595 114.215 36.7495 114.242 36.7441C115.317 35.738 116.399 34.7729 117.479 33.7768C117.486 33.6277 117.747 33.6795 117.712 33.4978C117.737 33.4932 117.784 33.4851 117.809 33.4805C121.002 30.5696 124.192 27.6541 127.383 24.7404C126.462 24.5541 125.527 24.4314 124.596 24.2987C124.579 24.2842 124.546 24.2533 124.528 24.2378C123.98 24.2551 123.44 24.0233 122.899 24.1088ZM128.504 30.974C124.923 34.2467 121.338 37.5184 117.756 40.7902L117.733 40.8683C117.707 40.8738 117.656 40.8838 117.631 40.8892C117.609 41.0428 117.368 41.0637 117.292 41.2128C113.833 44.36 110.385 47.5173 106.93 50.6681C106.835 50.7317 106.783 50.8853 106.639 50.8526C106.65 50.9817 106.502 51.0435 106.419 51.1216C106.29 51.2198 106.209 51.3743 106.042 51.427C105.674 51.8969 105.131 52.2549 104.713 52.6975C104.691 52.8402 104.44 52.7966 104.475 52.9765C104.451 52.9802 104.404 52.9883 104.381 52.992C103.677 53.6554 102.927 54.2843 102.246 54.9623C103.084 55.6357 103.994 56.241 104.883 56.8581C104.995 56.959 105.239 56.999 105.339 56.8608C113.387 49.503 121.446 42.1561 129.493 34.7965C129.598 34.7002 129.6 34.5511 129.597 34.423C129.59 33.1479 129.595 31.8737 129.594 30.5986C129.591 30.4187 129.625 30.2342 129.552 30.0624C129.162 30.3215 128.859 30.6768 128.504 30.974ZM129.329 42.2897C122.897 48.1598 116.464 54.028 110.039 59.9045C109.993 60.0126 110.034 60.1335 110.16 60.1735C110.44 60.3271 110.714 60.487 110.988 60.6497C111.332 60.5143 111.615 60.2825 111.938 60.1117C115.221 58.1186 118.362 55.9311 121.347 53.5764C124.209 51.2779 126.92 48.8078 129.288 46.0704C129.412 45.9277 129.569 45.7941 129.598 45.6024C129.589 44.6027 129.595 43.6021 129.597 42.6023C129.585 42.4524 129.634 42.2888 129.552 42.1516C129.463 42.177 129.389 42.2234 129.329 42.2897Z" fill="#4ADE80"/>
<path d="M188.195 42.5724C188.195 49.4116 186.269 54.1758 182.418 56.865C178.865 59.355 173.985 60.6 167.777 60.6H153.683V59.6538H156.97V26.6862H153.683V25.74H169.071C175.446 25.74 180.227 27.0514 183.414 29.6742C186.601 32.2638 188.195 36.5632 188.195 42.5724ZM166.681 59.6538H168.573C171.927 59.6538 174.317 58.4752 175.745 56.118C177.205 53.7276 177.936 49.7436 177.936 44.166V41.2776C177.936 33.8076 176.508 29.309 173.653 27.7818C172.292 27.0514 170.366 26.6862 167.876 26.6862H166.681V59.6538ZM219.375 60.6H208.021L207.473 56.9646C206.942 58.2926 206.145 59.3218 205.083 60.0522C204.053 60.7494 202.51 61.098 200.451 61.098C195.305 61.098 192.732 58.3258 192.732 52.7814V37.7916H189.943V36.8952H201.995V53.9766C201.995 55.9686 202.128 57.28 202.393 57.9108C202.692 58.5416 203.257 58.857 204.087 58.857C204.95 58.857 205.713 58.3424 206.377 57.3132C207.041 56.284 207.373 54.8564 207.373 53.0304V37.7916H205.083V36.8952H216.636V59.7036H219.375V60.6ZM222.885 53.4786V37.7916H220.146V36.8952H222.885V30.471L232.147 28.1802V36.8952H238.621V37.7916H232.147V54.5742C232.147 56.1346 232.297 57.28 232.596 58.0104C232.928 58.7408 233.592 59.106 234.588 59.106C235.584 59.106 236.447 58.608 237.177 57.612C237.941 56.616 238.439 55.2548 238.671 53.5284L239.518 53.628C239.252 55.9188 238.522 57.7448 237.327 59.106C236.131 60.434 234.156 61.098 231.4 61.098C228.645 61.098 226.537 60.5502 225.076 59.4546C223.615 58.359 222.885 56.367 222.885 53.4786ZM239.258 37.7916V36.8952H253.7V37.7916H251.011L256.439 54.3252L262.216 37.7916H258.88V36.8952H265.901V37.7916H263.411L254.099 64.6338C253.003 67.7546 251.775 69.9292 250.414 71.1576C249.052 72.4192 247.392 73.05 245.434 73.05C243.475 73.05 241.931 72.6018 240.802 71.7054C239.673 70.809 239.109 69.6636 239.109 68.2692C239.109 66.8748 239.474 65.8124 240.205 65.082C240.935 64.3516 241.898 63.9864 243.093 63.9864C245.849 63.9864 247.226 65.1318 247.226 67.4226C247.226 67.9206 247.127 68.5182 246.928 69.2154H245.185C244.919 69.979 244.886 70.6098 245.085 71.1078C245.284 71.6058 245.732 71.8548 246.43 71.8548C247.791 71.8548 249.003 71.1742 250.065 69.813C251.127 68.485 252.14 66.4432 253.103 63.6876L254.198 60.6H249.816L241.3 37.7916H239.258Z" fill="#09090A"/>
<path d="M100.469 89.825H102.219L105.508 98.5984L108.789 89.825H110.539L106.195 101.2H104.805L100.469 89.825ZM99.6719 89.825H101.336L101.625 97.4187V101.2H99.6719V89.825ZM109.672 89.825H111.344V101.2H109.383V97.4187L109.672 89.825ZM118.25 99.5046V95.4734C118.25 95.1713 118.195 94.9109 118.086 94.6921C117.977 94.4734 117.81 94.3041 117.586 94.1843C117.367 94.0645 117.091 94.0046 116.758 94.0046C116.451 94.0046 116.185 94.0567 115.961 94.1609C115.737 94.2651 115.562 94.4057 115.438 94.5828C115.312 94.7598 115.25 94.9604 115.25 95.1843H113.375C113.375 94.851 113.456 94.5281 113.617 94.2156C113.779 93.9031 114.013 93.6244 114.32 93.3796C114.628 93.1348 114.995 92.9421 115.422 92.8015C115.849 92.6609 116.328 92.5906 116.859 92.5906C117.495 92.5906 118.057 92.6973 118.547 92.9109C119.042 93.1244 119.43 93.4473 119.711 93.8796C119.997 94.3067 120.141 94.8432 120.141 95.489V99.2468C120.141 99.6322 120.167 99.9786 120.219 100.286C120.276 100.588 120.357 100.851 120.461 101.075V101.2H118.531C118.443 100.997 118.372 100.739 118.32 100.427C118.273 100.109 118.25 99.8015 118.25 99.5046ZM118.523 96.0593L118.539 97.2234H117.188C116.839 97.2234 116.531 97.2572 116.266 97.325C116 97.3875 115.779 97.4812 115.602 97.6062C115.424 97.7312 115.292 97.8822 115.203 98.0593C115.115 98.2364 115.07 98.4369 115.07 98.6609C115.07 98.8848 115.122 99.0906 115.227 99.2781C115.331 99.4604 115.482 99.6036 115.68 99.7078C115.883 99.8119 116.128 99.864 116.414 99.864C116.799 99.864 117.135 99.7859 117.422 99.6296C117.714 99.4682 117.943 99.2729 118.109 99.0437C118.276 98.8093 118.365 98.588 118.375 98.3796L118.984 99.2156C118.922 99.4291 118.815 99.6583 118.664 99.9031C118.513 100.148 118.315 100.382 118.07 100.606C117.831 100.825 117.542 101.005 117.203 101.145C116.87 101.286 116.484 101.356 116.047 101.356C115.495 101.356 115.003 101.247 114.57 101.028C114.138 100.804 113.799 100.505 113.555 100.13C113.31 99.7494 113.188 99.3197 113.188 98.8406C113.188 98.3927 113.271 97.9968 113.438 97.6531C113.609 97.3041 113.859 97.0125 114.188 96.7781C114.521 96.5437 114.927 96.3666 115.406 96.2468C115.885 96.1218 116.432 96.0593 117.047 96.0593H118.523ZM124.008 89.2V101.2H122.117V89.2H124.008ZM129.258 92.7468L125.578 96.825L123.562 98.8875L123.07 97.2937L124.594 95.4109L126.984 92.7468H129.258ZM127.391 101.2L124.648 97.2312L125.836 95.9109L129.57 101.2H127.391ZM134.023 101.356C133.398 101.356 132.833 101.255 132.328 101.052C131.828 100.843 131.401 100.554 131.047 100.184C130.698 99.8145 130.43 99.3796 130.242 98.8796C130.055 98.3796 129.961 97.8406 129.961 97.2625V96.95C129.961 96.2885 130.057 95.6895 130.25 95.1531C130.443 94.6166 130.711 94.1583 131.055 93.7781C131.398 93.3927 131.805 93.0984 132.273 92.8953C132.742 92.6921 133.25 92.5906 133.797 92.5906C134.401 92.5906 134.93 92.6921 135.383 92.8953C135.836 93.0984 136.211 93.3848 136.508 93.7546C136.81 94.1192 137.034 94.5541 137.18 95.0593C137.331 95.5645 137.406 96.1218 137.406 96.7312V97.5359H130.875V96.1843H135.547V96.0359C135.536 95.6973 135.469 95.3796 135.344 95.0828C135.224 94.7859 135.039 94.5463 134.789 94.364C134.539 94.1817 134.206 94.0906 133.789 94.0906C133.477 94.0906 133.198 94.1583 132.953 94.2937C132.714 94.4239 132.513 94.614 132.352 94.864C132.19 95.114 132.065 95.4161 131.977 95.7703C131.893 96.1192 131.852 96.5125 131.852 96.95V97.2625C131.852 97.6322 131.901 97.976 132 98.2937C132.104 98.6062 132.255 98.8796 132.453 99.114C132.651 99.3484 132.891 99.5333 133.172 99.6687C133.453 99.7989 133.773 99.864 134.133 99.864C134.586 99.864 134.99 99.7729 135.344 99.5906C135.698 99.4083 136.005 99.1505 136.266 98.8171L137.258 99.7781C137.076 100.044 136.839 100.299 136.547 100.544C136.255 100.783 135.898 100.979 135.477 101.13C135.06 101.281 134.576 101.356 134.023 101.356ZM146.586 101.356C145.961 101.356 145.396 101.255 144.891 101.052C144.391 100.843 143.964 100.554 143.609 100.184C143.26 99.8145 142.992 99.3796 142.805 98.8796C142.617 98.3796 142.523 97.8406 142.523 97.2625V96.95C142.523 96.2885 142.62 95.6895 142.812 95.1531C143.005 94.6166 143.273 94.1583 143.617 93.7781C143.961 93.3927 144.367 93.0984 144.836 92.8953C145.305 92.6921 145.812 92.5906 146.359 92.5906C146.964 92.5906 147.492 92.6921 147.945 92.8953C148.398 93.0984 148.773 93.3848 149.07 93.7546C149.372 94.1192 149.596 94.5541 149.742 95.0593C149.893 95.5645 149.969 96.1218 149.969 96.7312V97.5359H143.438V96.1843H148.109V96.0359C148.099 95.6973 148.031 95.3796 147.906 95.0828C147.786 94.7859 147.602 94.5463 147.352 94.364C147.102 94.1817 146.768 94.0906 146.352 94.0906C146.039 94.0906 145.76 94.1583 145.516 94.2937C145.276 94.4239 145.076 94.614 144.914 94.864C144.753 95.114 144.628 95.4161 144.539 95.7703C144.456 96.1192 144.414 96.5125 144.414 96.95V97.2625C144.414 97.6322 144.464 97.976 144.562 98.2937C144.667 98.6062 144.818 98.8796 145.016 99.114C145.214 99.3484 145.453 99.5333 145.734 99.6687C146.016 99.7989 146.336 99.864 146.695 99.864C147.148 99.864 147.552 99.7729 147.906 99.5906C148.26 99.4083 148.568 99.1505 148.828 98.8171L149.82 99.7781C149.638 100.044 149.401 100.299 149.109 100.544C148.818 100.783 148.461 100.979 148.039 101.13C147.622 101.281 147.138 101.356 146.586 101.356ZM156.203 99.5046V95.4734C156.203 95.1713 156.148 94.9109 156.039 94.6921C155.93 94.4734 155.763 94.3041 155.539 94.1843C155.32 94.0645 155.044 94.0046 154.711 94.0046C154.404 94.0046 154.138 94.0567 153.914 94.1609C153.69 94.2651 153.516 94.4057 153.391 94.5828C153.266 94.7598 153.203 94.9604 153.203 95.1843H151.328C151.328 94.851 151.409 94.5281 151.57 94.2156C151.732 93.9031 151.966 93.6244 152.273 93.3796C152.581 93.1348 152.948 92.9421 153.375 92.8015C153.802 92.6609 154.281 92.5906 154.812 92.5906C155.448 92.5906 156.01 92.6973 156.5 92.9109C156.995 93.1244 157.383 93.4473 157.664 93.8796C157.951 94.3067 158.094 94.8432 158.094 95.489V99.2468C158.094 99.6322 158.12 99.9786 158.172 100.286C158.229 100.588 158.31 100.851 158.414 101.075V101.2H156.484C156.396 100.997 156.326 100.739 156.273 100.427C156.227 100.109 156.203 99.8015 156.203 99.5046ZM156.477 96.0593L156.492 97.2234H155.141C154.792 97.2234 154.484 97.2572 154.219 97.325C153.953 97.3875 153.732 97.4812 153.555 97.6062C153.378 97.7312 153.245 97.8822 153.156 98.0593C153.068 98.2364 153.023 98.4369 153.023 98.6609C153.023 98.8848 153.076 99.0906 153.18 99.2781C153.284 99.4604 153.435 99.6036 153.633 99.7078C153.836 99.8119 154.081 99.864 154.367 99.864C154.753 99.864 155.089 99.7859 155.375 99.6296C155.667 99.4682 155.896 99.2729 156.062 99.0437C156.229 98.8093 156.318 98.588 156.328 98.3796L156.938 99.2156C156.875 99.4291 156.768 99.6583 156.617 99.9031C156.466 100.148 156.268 100.382 156.023 100.606C155.784 100.825 155.495 101.005 155.156 101.145C154.823 101.286 154.438 101.356 154 101.356C153.448 101.356 152.956 101.247 152.523 101.028C152.091 100.804 151.753 100.505 151.508 100.13C151.263 99.7494 151.141 99.3197 151.141 98.8406C151.141 98.3927 151.224 97.9968 151.391 97.6531C151.562 97.3041 151.812 97.0125 152.141 96.7781C152.474 96.5437 152.88 96.3666 153.359 96.2468C153.839 96.1218 154.385 96.0593 155 96.0593H156.477ZM163.516 99.8562C163.823 99.8562 164.099 99.7963 164.344 99.6765C164.594 99.5515 164.794 99.3796 164.945 99.1609C165.102 98.9421 165.188 98.6895 165.203 98.4031H166.977C166.966 98.95 166.805 99.4473 166.492 99.8953C166.18 100.343 165.766 100.7 165.25 100.966C164.734 101.226 164.164 101.356 163.539 101.356C162.893 101.356 162.331 101.247 161.852 101.028C161.372 100.804 160.974 100.497 160.656 100.106C160.339 99.7156 160.099 99.2651 159.938 98.7546C159.781 98.2442 159.703 97.6973 159.703 97.114V96.8406C159.703 96.2572 159.781 95.7104 159.938 95.2C160.099 94.6843 160.339 94.2312 160.656 93.8406C160.974 93.45 161.372 93.1453 161.852 92.9265C162.331 92.7026 162.891 92.5906 163.531 92.5906C164.208 92.5906 164.802 92.726 165.312 92.9968C165.823 93.2625 166.224 93.6348 166.516 94.114C166.812 94.588 166.966 95.1401 166.977 95.7703H165.203C165.188 95.4578 165.109 95.1765 164.969 94.9265C164.833 94.6713 164.641 94.4682 164.391 94.3171C164.146 94.1661 163.852 94.0906 163.508 94.0906C163.128 94.0906 162.812 94.1687 162.562 94.325C162.312 94.476 162.117 94.6843 161.977 94.95C161.836 95.2104 161.734 95.5046 161.672 95.8328C161.615 96.1557 161.586 96.4916 161.586 96.8406V97.114C161.586 97.463 161.615 97.8015 161.672 98.1296C161.729 98.4578 161.828 98.752 161.969 99.0125C162.115 99.2677 162.312 99.4734 162.562 99.6296C162.812 99.7807 163.13 99.8562 163.516 99.8562ZM170.281 89.2V101.2H168.406V89.2H170.281ZM169.953 96.6609L169.344 96.6531C169.349 96.0697 169.43 95.5307 169.586 95.0359C169.747 94.5411 169.971 94.1114 170.258 93.7468C170.549 93.377 170.898 93.0932 171.305 92.8953C171.711 92.6921 172.161 92.5906 172.656 92.5906C173.073 92.5906 173.448 92.6479 173.781 92.7625C174.12 92.877 174.411 93.0619 174.656 93.3171C174.901 93.5671 175.086 93.8953 175.211 94.3015C175.341 94.7026 175.406 95.1921 175.406 95.7703V101.2H173.516V95.7546C173.516 95.3484 173.456 95.0255 173.336 94.7859C173.221 94.5463 173.052 94.3744 172.828 94.2703C172.604 94.1609 172.331 94.1062 172.008 94.1062C171.669 94.1062 171.37 94.1739 171.109 94.3093C170.854 94.4447 170.641 94.6296 170.469 94.864C170.297 95.0984 170.167 95.3692 170.078 95.6765C169.995 95.9838 169.953 96.3119 169.953 96.6609ZM186.453 99.45V89.2H188.344V101.2H186.633L186.453 99.45ZM180.953 97.0671V96.9031C180.953 96.2625 181.029 95.6791 181.18 95.1531C181.331 94.6218 181.549 94.1661 181.836 93.7859C182.122 93.4005 182.471 93.1062 182.883 92.9031C183.294 92.6947 183.758 92.5906 184.273 92.5906C184.784 92.5906 185.232 92.6895 185.617 92.8875C186.003 93.0854 186.331 93.3692 186.602 93.739C186.872 94.1036 187.089 94.5411 187.25 95.0515C187.411 95.5567 187.526 96.1192 187.594 96.739V97.2625C187.526 97.8666 187.411 98.4187 187.25 98.9187C187.089 99.4187 186.872 99.851 186.602 100.216C186.331 100.58 186 100.861 185.609 101.059C185.224 101.257 184.773 101.356 184.258 101.356C183.747 101.356 183.286 101.249 182.875 101.036C182.469 100.822 182.122 100.523 181.836 100.137C181.549 99.752 181.331 99.2989 181.18 98.7781C181.029 98.252 180.953 97.6817 180.953 97.0671ZM182.836 96.9031V97.0671C182.836 97.4526 182.87 97.8119 182.938 98.1453C183.01 98.4786 183.122 98.7729 183.273 99.0281C183.424 99.2781 183.62 99.476 183.859 99.6218C184.104 99.7625 184.396 99.8328 184.734 99.8328C185.161 99.8328 185.513 99.739 185.789 99.5515C186.065 99.364 186.281 99.1114 186.438 98.7937C186.599 98.4708 186.708 98.1114 186.766 97.7156V96.3015C186.734 95.9942 186.669 95.7078 186.57 95.4421C186.477 95.1765 186.349 94.9447 186.188 94.7468C186.026 94.5437 185.826 94.3875 185.586 94.2781C185.352 94.1635 185.073 94.1062 184.75 94.1062C184.406 94.1062 184.115 94.1791 183.875 94.325C183.635 94.4708 183.438 94.6713 183.281 94.9265C183.13 95.1817 183.018 95.4786 182.945 95.8171C182.872 96.1557 182.836 96.5177 182.836 96.9031ZM195.078 99.5046V95.4734C195.078 95.1713 195.023 94.9109 194.914 94.6921C194.805 94.4734 194.638 94.3041 194.414 94.1843C194.195 94.0645 193.919 94.0046 193.586 94.0046C193.279 94.0046 193.013 94.0567 192.789 94.1609C192.565 94.2651 192.391 94.4057 192.266 94.5828C192.141 94.7598 192.078 94.9604 192.078 95.1843H190.203C190.203 94.851 190.284 94.5281 190.445 94.2156C190.607 93.9031 190.841 93.6244 191.148 93.3796C191.456 93.1348 191.823 92.9421 192.25 92.8015C192.677 92.6609 193.156 92.5906 193.688 92.5906C194.323 92.5906 194.885 92.6973 195.375 92.9109C195.87 93.1244 196.258 93.4473 196.539 93.8796C196.826 94.3067 196.969 94.8432 196.969 95.489V99.2468C196.969 99.6322 196.995 99.9786 197.047 100.286C197.104 100.588 197.185 100.851 197.289 101.075V101.2H195.359C195.271 100.997 195.201 100.739 195.148 100.427C195.102 100.109 195.078 99.8015 195.078 99.5046ZM195.352 96.0593L195.367 97.2234H194.016C193.667 97.2234 193.359 97.2572 193.094 97.325C192.828 97.3875 192.607 97.4812 192.43 97.6062C192.253 97.7312 192.12 97.8822 192.031 98.0593C191.943 98.2364 191.898 98.4369 191.898 98.6609C191.898 98.8848 191.951 99.0906 192.055 99.2781C192.159 99.4604 192.31 99.6036 192.508 99.7078C192.711 99.8119 192.956 99.864 193.242 99.864C193.628 99.864 193.964 99.7859 194.25 99.6296C194.542 99.4682 194.771 99.2729 194.938 99.0437C195.104 98.8093 195.193 98.588 195.203 98.3796L195.812 99.2156C195.75 99.4291 195.643 99.6583 195.492 99.9031C195.341 100.148 195.143 100.382 194.898 100.606C194.659 100.825 194.37 101.005 194.031 101.145C193.698 101.286 193.312 101.356 192.875 101.356C192.323 101.356 191.831 101.247 191.398 101.028C190.966 100.804 190.628 100.505 190.383 100.13C190.138 99.7494 190.016 99.3197 190.016 98.8406C190.016 98.3927 190.099 97.9968 190.266 97.6531C190.438 97.3041 190.688 97.0125 191.016 96.7781C191.349 96.5437 191.755 96.3666 192.234 96.2468C192.714 96.1218 193.26 96.0593 193.875 96.0593H195.352ZM201.266 100.278L203.562 92.7468H205.578L202.188 102.489C202.109 102.697 202.008 102.924 201.883 103.169C201.758 103.413 201.594 103.645 201.391 103.864C201.193 104.088 200.945 104.268 200.648 104.403C200.352 104.544 199.992 104.614 199.57 104.614C199.404 104.614 199.242 104.598 199.086 104.567C198.935 104.541 198.792 104.512 198.656 104.481L198.648 103.044C198.701 103.049 198.763 103.054 198.836 103.059C198.914 103.065 198.977 103.067 199.023 103.067C199.336 103.067 199.596 103.028 199.805 102.95C200.013 102.877 200.182 102.757 200.312 102.591C200.448 102.424 200.562 102.2 200.656 101.919L201.266 100.278ZM199.969 92.7468L201.977 99.075L202.312 101.059L201.008 101.395L197.938 92.7468H199.969ZM214.094 99.8562C214.401 99.8562 214.677 99.7963 214.922 99.6765C215.172 99.5515 215.372 99.3796 215.523 99.1609C215.68 98.9421 215.766 98.6895 215.781 98.4031H217.555C217.544 98.95 217.383 99.4473 217.07 99.8953C216.758 100.343 216.344 100.7 215.828 100.966C215.312 101.226 214.742 101.356 214.117 101.356C213.471 101.356 212.909 101.247 212.43 101.028C211.951 100.804 211.552 100.497 211.234 100.106C210.917 99.7156 210.677 99.2651 210.516 98.7546C210.359 98.2442 210.281 97.6973 210.281 97.114V96.8406C210.281 96.2572 210.359 95.7104 210.516 95.2C210.677 94.6843 210.917 94.2312 211.234 93.8406C211.552 93.45 211.951 93.1453 212.43 92.9265C212.909 92.7026 213.469 92.5906 214.109 92.5906C214.786 92.5906 215.38 92.726 215.891 92.9968C216.401 93.2625 216.802 93.6348 217.094 94.114C217.391 94.588 217.544 95.1401 217.555 95.7703H215.781C215.766 95.4578 215.688 95.1765 215.547 94.9265C215.411 94.6713 215.219 94.4682 214.969 94.3171C214.724 94.1661 214.43 94.0906 214.086 94.0906C213.706 94.0906 213.391 94.1687 213.141 94.325C212.891 94.476 212.695 94.6843 212.555 94.95C212.414 95.2104 212.312 95.5046 212.25 95.8328C212.193 96.1557 212.164 96.4916 212.164 96.8406V97.114C212.164 97.463 212.193 97.8015 212.25 98.1296C212.307 98.4578 212.406 98.752 212.547 99.0125C212.693 99.2677 212.891 99.4734 213.141 99.6296C213.391 99.7807 213.708 99.8562 214.094 99.8562ZM218.641 97.0671V96.8875C218.641 96.2781 218.729 95.713 218.906 95.1921C219.083 94.6661 219.339 94.2104 219.672 93.825C220.01 93.4343 220.422 93.1322 220.906 92.9187C221.396 92.7 221.948 92.5906 222.562 92.5906C223.182 92.5906 223.734 92.7 224.219 92.9187C224.708 93.1322 225.122 93.4343 225.461 93.825C225.799 94.2104 226.057 94.6661 226.234 95.1921C226.411 95.713 226.5 96.2781 226.5 96.8875V97.0671C226.5 97.6765 226.411 98.2416 226.234 98.7625C226.057 99.2833 225.799 99.739 225.461 100.13C225.122 100.515 224.711 100.817 224.227 101.036C223.742 101.249 223.193 101.356 222.578 101.356C221.958 101.356 221.404 101.249 220.914 101.036C220.43 100.817 220.018 100.515 219.68 100.13C219.341 99.739 219.083 99.2833 218.906 98.7625C218.729 98.2416 218.641 97.6765 218.641 97.0671ZM220.523 96.8875V97.0671C220.523 97.4473 220.562 97.8067 220.641 98.1453C220.719 98.4838 220.841 98.7807 221.008 99.0359C221.174 99.2911 221.388 99.4916 221.648 99.6375C221.909 99.7833 222.219 99.8562 222.578 99.8562C222.927 99.8562 223.229 99.7833 223.484 99.6375C223.745 99.4916 223.958 99.2911 224.125 99.0359C224.292 98.7807 224.414 98.4838 224.492 98.1453C224.576 97.8067 224.617 97.4473 224.617 97.0671V96.8875C224.617 96.5125 224.576 96.1583 224.492 95.825C224.414 95.4864 224.289 95.1869 224.117 94.9265C223.951 94.6661 223.737 94.463 223.477 94.3171C223.221 94.1661 222.917 94.0906 222.562 94.0906C222.208 94.0906 221.901 94.1661 221.641 94.3171C221.385 94.463 221.174 94.6661 221.008 94.9265C220.841 95.1869 220.719 95.4864 220.641 95.825C220.562 96.1583 220.523 96.5125 220.523 96.8875ZM233.164 99.2078V92.7468H235.055V101.2H233.273L233.164 99.2078ZM233.43 97.45L234.062 97.4343C234.062 98.002 234 98.5255 233.875 99.0046C233.75 99.4786 233.557 99.8927 233.297 100.247C233.036 100.596 232.703 100.869 232.297 101.067C231.891 101.26 231.404 101.356 230.836 101.356C230.424 101.356 230.047 101.296 229.703 101.177C229.359 101.057 229.062 100.872 228.812 100.622C228.568 100.372 228.378 100.046 228.242 99.6453C228.107 99.2442 228.039 98.7651 228.039 98.2078V92.7468H229.922V98.2234C229.922 98.5307 229.958 98.7885 230.031 98.9968C230.104 99.2 230.203 99.364 230.328 99.489C230.453 99.614 230.599 99.7026 230.766 99.7546C230.932 99.8067 231.109 99.8328 231.297 99.8328C231.833 99.8328 232.255 99.7286 232.562 99.5203C232.875 99.3067 233.096 99.0203 233.227 98.6609C233.362 98.3015 233.43 97.8979 233.43 97.45ZM238.852 94.5515V101.2H236.969V92.7468H238.742L238.852 94.5515ZM238.516 96.6609L237.906 96.6531C237.911 96.0541 237.995 95.5046 238.156 95.0046C238.323 94.5046 238.552 94.075 238.844 93.7156C239.141 93.3562 239.495 93.0802 239.906 92.8875C240.318 92.6895 240.776 92.5906 241.281 92.5906C241.688 92.5906 242.055 92.6479 242.383 92.7625C242.716 92.8718 243 93.0515 243.234 93.3015C243.474 93.5515 243.656 93.877 243.781 94.2781C243.906 94.6739 243.969 95.1609 243.969 95.739V101.2H242.078V95.7312C242.078 95.325 242.018 95.0046 241.898 94.7703C241.784 94.5307 241.615 94.3614 241.391 94.2625C241.172 94.1583 240.898 94.1062 240.57 94.1062C240.247 94.1062 239.958 94.1739 239.703 94.3093C239.448 94.4447 239.232 94.6296 239.055 94.864C238.883 95.0984 238.75 95.3692 238.656 95.6765C238.562 95.9838 238.516 96.3119 238.516 96.6609ZM249.766 92.7468V94.1218H245V92.7468H249.766ZM246.375 90.6765H248.258V98.864C248.258 99.1244 248.294 99.325 248.367 99.4656C248.445 99.601 248.552 99.6921 248.688 99.739C248.823 99.7859 248.982 99.8093 249.164 99.8093C249.294 99.8093 249.419 99.8015 249.539 99.7859C249.659 99.7703 249.755 99.7546 249.828 99.739L249.836 101.177C249.68 101.223 249.497 101.265 249.289 101.302C249.086 101.338 248.852 101.356 248.586 101.356C248.154 101.356 247.771 101.281 247.438 101.13C247.104 100.973 246.844 100.721 246.656 100.372C246.469 100.023 246.375 99.5593 246.375 98.9812V90.6765ZM253.391 89.825L253.203 97.8484H251.594L251.398 89.825H253.391ZM251.344 100.309C251.344 100.023 251.438 99.7833 251.625 99.5906C251.818 99.3927 252.083 99.2937 252.422 99.2937C252.755 99.2937 253.018 99.3927 253.211 99.5906C253.404 99.7833 253.5 100.023 253.5 100.309C253.5 100.585 253.404 100.822 253.211 101.02C253.018 101.213 252.755 101.309 252.422 101.309C252.083 101.309 251.818 101.213 251.625 101.02C251.438 100.822 251.344 100.585 251.344 100.309Z" fill="#484848"/>
</svg>
`;
