import { url } from "../action";
import axios from "axios";

const uploadFile = async (files, token) => {
  //console.log(files);
  if (!Array.isArray(files)) {
    return null;
  }
  const myHeaders = new Headers();
  const formData = new FormData();
  myHeaders.append("Authorization", `Bearer ${token}`);
  files.forEach((file) => {
    formData.append("image", file, file.name);
  });
  const options = {
    method: "POST",
    headers: myHeaders,
    body: formData,
  };
  const result = await fetch(`${url}/server/upload`, options);
  if (result) {
    const data = await result.json();
    const { urls } = data;
    return urls;
  }
  return result
};
export { uploadFile };
