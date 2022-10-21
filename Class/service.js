import { url } from "../action";
import axios from "axios";
import { localOptionsToServer } from "../Class/dataConverter";
import DateTime from "./../screens/Seller/DateTime";

const timePick = (date) => {
  date = new Date(date);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const createService = async (
  businessForm,
  listData,
  images,
  token,
  img1,
  img2
) => {
  const myHeaders = new Headers();
  //const formData=new FormData()
  let working = [];
  Array.isArray(businessForm.workingTime) &&
    businessForm.workingTime.forEach((doc) => {
      working.push({
        day: doc.title,
        open: timePick(doc.openingTime.toString()),
        close: timePick(doc.closingTime.toString()),
      });
    });
  myHeaders.append("Authorization", `Bearer ${token}`);
  const DASHBOARD = [
    "BUIDLER",
    "BUSINESS",
    "COOKER",
    "ELECTRICIAN",
    "ENTERTAINMENT",
    "HOUSEKEEPER",
    "IT",
    "LABOR",
    "LAWYER",
    "LIFESTYLE",
    "MUSIC",
    "ONLINETUTION",
    "PAINTER",
    "PARLOUR",
  ];
  const text = listData[0].mainTitle;
  let dashboard = "";
  DASHBOARD.forEach((das, i) => {
    if (
      das.length > 2 &&
      das[0] == text[0].toUpperCase() &&
      das[1] == text[1].toUpperCase() &&
      das[2] == text[2].toUpperCase()
    ) {
      dashboard = DASHBOARD[i];
    }
    if (
      das[0].match(text[0].toUpperCase()) &&
      das[1].match(text[1].toUpperCase())
    ) {
      dashboard = DASHBOARD[i];
    }
  });

  let month = DateTime.month.indexOf(businessForm.startDate.month) + 1;
  month = month > 9 ? month : "0" + month;
  let day =
    businessForm.startDate.day > 9
      ? businessForm.startDate.day
      : "0" + businessForm.startDate.day;
  let dateIs = `${businessForm.startDate.year}-${month}-${day}`;
  const formData = {
    data: {
      optionsData: {
        category: dashboard,
        type: listData[0].subTitle ? 3 : listData[0].title ? 2 : 1,
        options: localOptionsToServer(listData),
      },
      dashboard: dashboard,
      uploadServiceData: {
        about: businessForm.about.toString(),
        speciality: businessForm.speciality,
        title: businessForm.serviceTitle,
        description: businessForm.description.toString(),
      },
      selectServiceData: {
        serviceName: businessForm.serviceCenterName,
        providerTitle: businessForm.title,
        providerName: businessForm.name,
        gender: businessForm.gender,
        position: businessForm.position,
        worker: businessForm.teamNumber,
        startDate: dateIs,
        workingTime: working,
        t47: true,
        startingPrice: businessForm.price,
        facilites: {
          title: "Choose Your Facilities",
          selectedOptions: Array.isArray(businessForm.facilities)
            ? businessForm.facilities.filter((data) => data.checked == true)
            : [],
        },
      },
      serviceLocationData: {
        state: businessForm.division,
        city: businessForm.district,
        area: businessForm.area,
        address: businessForm.address ? businessForm.address : "-",
      },
    },
    serviceImages: images,
    profilePhotoUrl: img1,
    wallPhotoUrl: img2,
  };
  //console.log('----------------------------------------------------');
  //console.log(formData)
  const options = {
    method: "POST",
    headers: myHeaders,
    body: formData,
  };
  let result = await axios
    .post(`${url}/server/services/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      console.warn(err.response.data.msg);
    });
  if (result) {
    return result.data;
  }
  return false;
};

export const getService = async (token, id) => {
  const result = await axios.get(`${url}/server/services/get/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result;
};
export const getGigs = async (token, id) => {
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
    return result.json();
  }
  return false;
};
export const getDashboard = async (token) => {
  let res = await axios.get(`${url}/server/auth/dashboards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
export const getServiceGigs = async (token) => {
  const res = await axios.get(`${url}/server/services/gigs/starting`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
export const changeActiveService = async (token, serviceId, type) => {
  //console.log(serviceId)
  //console.log(type)
  //console.log(token)
  const res = await axios.put(
    `${url}/server/services/toggle-active-service`,
    {
      serviceType: type,
      parentServiceId: serviceId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
//export const getFixedService=(token,serviceId,type)
export const createOtherService = async (
  token,
  businessForm,
  listData,
  images,
  serviceId,
  type
) => {
  const data = {
    title: businessForm.serviceTitle,
    price: parseInt(businessForm.price),
    facilites: {
      title: "Choose Your Facilities",
      selectedOptions: Array.isArray(businessForm.facilities)
        ? businessForm.facilities.filter((data) => data.checked == true)
        : [],
    },
    services: {
      category: getDashboardTitle(listData[0].mainTitle),
      type: listData[0].subTitle ? 3 : listData[0].title ? 2 : 1,
      options: localOptionsToServer(listData),
    },
    description: businessForm.description,
    images: images,
    serviceId: serviceId,
    type: type,
  };
  const res = await axios.post(`${url}/server/services/create/gig`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
export const getOtherServices = async (token, serviceId, type) => {
  const res = await axios.get(
    `${url}/server/services/get/gigs?serviceId=${serviceId}&type=${type}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export const getRelatedServices = async (token, serviceId, category) => {
  const res = await axios.get(
    `${url}/server/services/gigs/related?category=${category}&serviceId=${serviceId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export const getUnRelatedServices = async (token, serviceId, category) => {
  const res = await axios.get(
    `${url}/server/services/gigs/unrelated?category=${category}&serviceId=${serviceId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export const getDashboardTitle = (title) => {
  const DASHBOARD = [
    "BUIDLER",
    "BUSINESS",
    "COOKER",
    "ELECTRICIAN",
    "ENTERTAINMENT",
    "HOUSEKEEPER",
    "IT",
    "LABOR",
    "LAWYER",
    "LIFESTYLE",
    "MUSIC",
    "ONLINETUTION",
    "PAINTER",
    "PARLOUR",
  ];
  const text = title;
  let dashboard = "";
  DASHBOARD.forEach((das, i) => {
    if (
      das.length > 2 &&
      das[0] == text[0].toUpperCase() &&
      das[1] == text[1].toUpperCase() &&
      das[2] == text[2].toUpperCase()
    ) {
      dashboard = DASHBOARD[i];
    }
    if (
      das[0].match(text[0].toUpperCase()) &&
      das[1].match(text[1].toUpperCase())
    ) {
      dashboard = DASHBOARD[i];
    }
  });
  return dashboard;
};
export const getAllGigs = async (token) => {
  const res = await axios.get(`${url}/server/services/get/gigs/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
export const getTopServices = async (token) => {
  const res = await axios.get(`${url}/server/services/gigs/top`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
export const getPopularCategories = async (token) => {
  const res = await axios.get(
    `${url}/server/services/gigs/favourite-categories`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export const createOrder = async (
  token,
  serviceId,
  type,
  amount,
  description,
  offerPrice,
  deliveryDateFrom,
  deliveryDateTo,
  orderedBy
) => {
  const res = await axios.post(
    `${url}/server/orders/create`,
    {
      serviceId: serviceId,
      type: type,
      amount: amount,
      description: description,
      offerPrice: offerPrice,
      deliveryDateFrom: deliveryDateFrom,
      deliveryDateTo: deliveryDateTo,
      orderedBy: orderedBy,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res;
};
export const getOrders = async (token, type, id) => {
  if (id) {
    const res = await axios.get(
      `${url}/server/orders/${type}/get?serviceId=${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res;
  } else {
    const res = await axios.get(`${url}/server/orders/${type}/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  }
};
export const cancelOrder = async (token, orderId, status, type) => {
  const res = await axios.put(
    `${url}/server/orders/${type}/update`,
    {
      orderId: orderId,
      status: status,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res;
};
export const acceptOrder = async (token, data) => {
  //orderId, selectedServices, deliverBy, serviceType
  const res = await axios.post(`${url}/server/orders/accept`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
