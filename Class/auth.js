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
  await response.catch(err => {
    return err
  })
};
const checkUser = async () => {
  const res = await getJson("user");
  return res;
};
const logOut = async () => {
  const res = await storeJson("user",null)
  return res;
}
export { userLogin, checkUser,logOut };
