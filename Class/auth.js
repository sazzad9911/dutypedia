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
const vendorLogin = async (token, id,cuid) => {
  const myHeaders = new Headers();
  //const formData=new FormData()
  myHeaders.append("Authorization", `Bearer ${token}`);
  const options = {
    method: "GET",
    headers: myHeaders,
  };
  const result = await fetch(
    `${url}/server/services/get/gigs/${id}/STARTING`,
    options
  );
  if (result) {
    result=result.json()
    result=result.gigs.filter(d=>d.id==cuid)[0];
    const res = await storeJson("vendor",result)
    return result;
  }
  return false;
};
 const checkVendor=async() => {
  const res=await getJson("vendor");
  return res;
}
const logoutVendor=async() => {
  const res=await storeJson("vendor",null);
  return res;
}
export { userLogin, checkUser,logOut,checkVendor,logoutVendor,vendorLogin };
