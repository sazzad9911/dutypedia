import React from "react";
import { View, Text, Dimensions } from "react-native";
import Input from "./../components/Input";
import Button from "./../components/Button";
const { width, height } = Dimensions.get("window");
import { userLogin } from "../Class/auth";
import { useSelector, useDispatch } from "react-redux";
import { getService } from "../Class/service";

const Login = () => {
  const [Email, setEmail] = React.useState();
  const [Password, setPassword] = React.useState();
  const [EmailError, setEmailError] = React.useState();
  const [PasswordError, setPasswordError] = React.useState();
  const dispatch = useDispatch();

  const login = () => {
    setEmailError(null);
    setPasswordError(null);
    if (!Email) {
      setEmailError("This field is required");
      return;
    }
    if (!Password) {
      setPasswordError("This field is required");
      return;
    }
    userLogin(Email, Password)
      .then((res) => {
        //console.log(res);
        if (res) {
          dispatch({ type: "SET_USER", playload: res });
          getService(res.token).then((result) => {
            if (result && !result.msg) {
              dispatch({ type: "SET_VENDOR_INFO", playload: result });
            } else {
              dispatch({ type: "SET_VENDOR_INFO", playload: false });
            }
          });
        }
      })
      .catch((err) => {
        console.warn(err.message);
      });
  };
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
      <Button
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