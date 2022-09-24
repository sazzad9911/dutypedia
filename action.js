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
export const url = `http://185.211.6.223`;

export function fileFromURL(inputURI) {
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
