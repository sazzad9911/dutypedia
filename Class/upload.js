import { url } from "../action";
import axios from "axios";

const uploadFile = async (files, token, type) => {
  //console.log(files);
  //FILE
  if (!Array.isArray(files)) {
    return null;
  }
  const myHeaders = new Headers();
  const formData = new FormData();
  myHeaders.append("Authorization", `Bearer ${token}`);
  files.forEach((file) => {
    formData.append("files", file, file.name);
  });
  formData.append("type", type ? type : "IMAGE");

  const options = {
    method: "POST",
    headers: myHeaders,
    body: formData,
  };
  const result = await fetch(`${url}/server/upload`, options);
  
  if (result) {
    const data = await result.json();
    const { files } = data;
    return files;
  }
  return result;
};
export { uploadFile };
