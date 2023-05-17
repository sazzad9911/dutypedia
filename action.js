export const setBottomSheet = (data) => {
  return {
    type: "SET_BOTTOM_SHEET",
    playload: data,
  };
};
export const setAllData = (data) => {
  return {
    type: "SET_DATA",
    playload: data,
  };
};
export const addListData = (data) => {
  return {
    type: "ADD_DATA",
    playload: data,
  };
};
export const deleteListData = (id) => {
  return {
    type: "DELETE_DATA",
    playload: id,
  };
};
export const setArrayReplaceData = (data, i) => {
  return {
    type: "SET_ARRAY_REPLACE",
    playload: data,
    index: i,
  };
};
export const setArrayReplaceData2 = (data, i, id) => {
  return {
    type: "SET_ARRAY_REPLACE_2",
    playload: data,
    index: i,
    nextId: id,
  };
};
export const setListReplace1 = (data, id, nextId, lastId, listId) => {
  return {
    type: "SET_LIST_REPLACE_1",
    playload: data,
    id: id,
    nextId: nextId,
    lastId: lastId,
    listId: listId,
  };
};
export const setListReplace2 = (data, id, nextId, listId) => {
  return {
    type: "SET_LIST_REPLACE_2",
    playload: data,
    id: id,
    nextId: nextId,
    listId: listId,
  };
};
export const setListReplace3 = (data, id, listId) => {
  return {
    type: "SET_LIST_REPLACE_3",
    playload: data,
    id: id,
    listId: listId,
  };
};
export const bottomRef = (data) => {
  return {
    type: "SET_BOTTOM_REF",
    playload: data,
  };
};
export const setListData = (data) => {
  return {
    type: "SET_DATA",
    playload: data,
  };
};
export const numToArray = (integer) => {
  let number = parseInt(integer);
  let arr = [];
  let i = 0;
  while (i <= number) {
    arr.push(i);
    i++;
  }
  return arr;
};
export const shortAZ = (data) => {
  data.sort((a, b) => {
    return a.title > b.title;
  });
};
export const url = `https://duty.com.bd`;

export function fileFromURL(inputURI) {
  if (inputURI == null) {
    return null;
  }
  let localUri = inputURI.uri;
  let filename = localUri.split("/").pop();

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  return { uri: localUri, name: filename, type };
}
export const dateConverter = (date) => {
  date = new Date(date);
  let fullYear = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : "0" + month;
  let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  return `${fullYear}-${month}-${day}`;
};
export const dateDifference = (newDate, oldDate) => {
  var date1 = new Date(newDate).getTime();
  var date2 = new Date(oldDate).getTime();
  var diffDays = (date2 - date1) / (1000 * 60 * 60 * 24);
  return diffDays.toFixed(0);
};
export const convertDate = (date) => {
  let data = "";
  return (data =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
};
export const timeConverter = (timestamp) => {
  let date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
export const allTimeConverter = (timestamp) => {
  let date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes();

  var strTime = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  return strTime;
};
export const changeTime = (time) => {
  time = time.split(":");
  let hours = parseInt(time[0]);
  let minutes = parseInt(time[1]);
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
export const serverTimeToLocal = (date) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let time = timeConverter(date);
  date = new Date(date);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let year = date.getFullYear();
  let month = date.getMonth();
  return `${months[month]} ${day} ${time}`;
};
export const serverTimeToLocalDate = (date, dayPlus) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  date = new Date(date);
  if (dayPlus) {
    date.setDate(date.getDate() + dayPlus);
  }
  let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let year = date.getFullYear();
  let month = date.getMonth();
  return `${day} ${months[month]} ${year}`;
};
export const localTimeToServerDate = (date, dayPlus) => {
  date = new Date(date);
  if (dayPlus) {
    date.setDate(date.getDate() + dayPlus);
  }
  let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let year = date.getFullYear();
  let month = date.getMonth();
  return dateConverter(date);
};
export const slashDate = (date) => {
  date = new Date(date);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let year = date.getFullYear();
  let month =
    date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`;
  return `${day}/${month}/${year}`;
};
export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
