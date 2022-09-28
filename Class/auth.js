import { url } from "../action";
import axios from "axios";
import { storeJson, getJson } from "./storage";

const userLogin = async (email, password) => {
  const response = await axios.post(`${url}/server/auth/login`, {
    email: email,
    password: password,
  });

  if (response) {
    await storeJson("user", response.data);
    return response.data;
  }
  await response.catch((err) => {
    return err;
  });
};
const checkUser = async () => {
  const res = await getJson("user");
  return res;
};
const logOut = async () => {
  const res = await storeJson("user", null);
  return res;
};
const vendorLogin = async (token,id) => {
  
  const result = await axios.get(`${url}/server/services/get/${id}`,{
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
export { userLogin, checkUser, logOut, checkVendor, logoutVendor, vendorLogin };
