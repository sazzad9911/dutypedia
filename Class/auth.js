import { url } from "../action";
import axios from "axios";
import { storeJson, getJson } from "./storage";

const userLogin = async (email, password) => {
  const response = await axios.post(`${url}/server/auth/login`, {
    phone: email,
    password: password,
  });

  if (response.data) {
    await storeJson("user", response.data);
    return response.data;
  }
  return response
};
const checkUser = async () => {
  const res = await getJson("user");
  return res;
};
const logOut = async () => {
  const res = await storeJson("user", null);
  return res;
};
const vendorLogin = async (token, id) => {
  const result = await axios.get(`${url}/server/services/get/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (result) {
    const res = await storeJson("vendor", result.data);
    return result.data;
  }
  return false;
};
const checkVendor = async () => {
  const res = await getJson("vendor");
  return res;
};
const logoutVendor = async () => {
  const res = await storeJson("vendor", null);
  return res;
};
const setFavoriteCategories = async (token, category) => {
  const res = await axios.post(
    `${url}/server/auth/toggle-favourite-category`,
    {
      category: category,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
const getFavoriteCategories = async (token) => {
  const res = await axios.get(`${url}/server/auth/get-favourite-categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
const sendOTP = async (number) => {
  const res = await axios.post(`${url}/server/auth/register/send-otp`,{
    phone:number
  });
  return res;
};
const resetUser = async (number) => {
  const res = await axios.post(`${url}/server/auth/reset/send-otp`,{
    phone:number
  });
  return res;
};
const checkResetUser = async (number,otp) => {
  const res = await axios.post(`${url}/server/auth/reset/verify-otp`,{
    phone:number,
    otp:otp
  });
  return res;
};
const resetUserPassword=async(token,password)=>{
  const res = await axios.post(`${url}/server/auth/reset`,{
    token:token,
    password:password,
  });
  return res;
}
const checkOTP = async (number,otp) => {
  const res = await axios.post(`${url}/server/auth/register/verify-otp`,{
    phone:number,
    otp:otp
  });
  return res;
};
const registerUser=async(token,name,username,password,age,gender)=>{
  const res = await axios.post(`${url}/server/auth/register`,{
    token:token,
    name:name,
    username:username,
    password:password,
    age:age,
    gender:gender
  });
  return res;
}
const updateDeviceToken=async(token,deviceToken)=>{
  const res = await axios.put(`${url}/server/auth/update-device-token`,{
    deviceToken:deviceToken
  },{
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}
export {
  userLogin,
  checkUser,
  logOut,
  checkVendor,
  logoutVendor,
  vendorLogin,
  getFavoriteCategories,
  setFavoriteCategories,
  sendOTP,
  checkOTP,
  registerUser,
  resetUser,
  checkResetUser,
  resetUserPassword,
  updateDeviceToken
};
