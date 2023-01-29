import { url } from "../action";
import axios from "axios";
import { localOptionsToServer } from "../Class/dataConverter";
import DateTime from "./../screens/Seller/DateTime";
import { socket } from "./socket";
import { AllData } from "../Data/AllData";

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

  const text = listData[0].mainTitle;
  const dashboard = AllData.filter((d) => d.title == text)[0].key;

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
  const result = await axios.post(`${url}/server/services/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
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
    packageData: businessForm.packageData,
  };
  const res = await axios.post(`${url}/server/services/create/gig`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
export const createOtherServiceIndividual = async (
  token,
  businessForm,
  listData,
  images,
  serviceId,
  type,
  packageData,
  subsData,
  installmentData,
  price
) => {
  const data = {
    title: businessForm.serviceTitle,
    price: parseInt(
      subsData
        ? subsData.amount
        : installmentData
        ? installmentData.totalAmount
        : price
    ),
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
    packageData: packageData,
    subsData: subsData,
    installmentData: installmentData,
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
  orderedBy,
  selectedServices,
  facilites,
  selectedPackage,
  packageData,
  id,
  subsData,
  installmentData,
  attachment
) => {
  const data = {
    serviceId: serviceId,
    type: type,
    amount: amount,
    description: description,
    offerPrice: offerPrice,
    deliveryDateFrom: deliveryDateFrom,
    deliveryDateTo: deliveryDateTo,
    orderedBy: orderedBy,
    selectedServices: selectedServices,
    facilites: facilites,
    selectedPackage: selectedPackage,
    packageData: packageData,
    subsData: subsData,
    installmentData: installmentData,
    attachment: attachment,
  };
  //console.log(data)
  const res = await axios.post(`${url}/server/orders/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  //console.log(res)
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
export const getOfflineOrders = async (token, id) => {
  if (id) {
    const res = await axios.get(
      `${url}/server/orders/offline/get?serviceId=${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res;
  } else {
    const res = await axios.get(`${url}/server/orders/offline/get`, {
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
export const getLastOrder = async (token, serviceId) => {
  const res = await axios.get(
    `${url}/server/orders/last-agreement?serviceId=${serviceId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export const makePayment = async (token, orderId) => {
  const res = await axios.post(
    `${url}/server/orders/make-payment`,
    {
      orderId: orderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const makePaymentSubscription = async (
  token,
  orderId,
  subscriptionType,
  dateFrom,
  dateTo
) => {
  const res = await axios.post(
    `${url}/server/orders/make-payment-subs`,
    {
      orderId: orderId,
      subscriptionType: subscriptionType,
      dateFrom: dateFrom,
      dateTo: dateTo,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const requestForTime = async (token, orderId, newTime) => {
  const res = await axios.post(
    `${url}/server/orders/request-new-delivery-date`,
    {
      orderId: orderId,
      newDate: newTime,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const acceptTimeRequest = async (token, orderId, newTime, action) => {
  const res = await axios.post(
    `${url}/server/orders/accept-or-reject-delivery-date`,
    {
      orderId: orderId,
      newDate: newTime,
      action: action ? "ACCEPT" : "REJECT",
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res;
};
export const completeOrderDelivery = async (token, orderId) => {
  const res = await axios.post(
    `${url}/server/orders/delivered`,
    {
      orderId: orderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  // socket.emit("updateOrder", {
  //   receiverId: res.data.receiverId,
  //   order: res.data.order,
  // });
  return res;
};
export const orderRefound = async (token, orderId, action) => {
  if (action) {
    const res = await axios.post(
      `${url}/server/orders/refunded`,
      {
        orderId: orderId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res;
  } else {
    const res = await axios.post(
      `${url}/server/orders/reject-refund`,
      {
        orderId: orderId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res;
  }
};
export const completeOrder = async (token, orderId) => {
  const res = await axios.post(
    `${url}/server/orders/received`,
    {
      orderId: orderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const createVendorOrder = async (
  token,
  userId,
  facilites,
  selectedServices,
  serviceId,
  type,
  amount,
  description,
  offerPrice,
  deliveryDateFrom,
  deliveryDateTo,
  orderedBy,
  agreement,
  selectedPackage,
  subsData,
  installmentData
) => {
  const data = {
    userId: userId,
    facilites: facilites,
    selectedServices: selectedServices,
    serviceId: serviceId,
    type: type,
    amount: amount,
    description: description,
    offerPrice: offerPrice,
    deliveryDateFrom: deliveryDateFrom,
    deliveryDateTo: deliveryDateTo,
    orderedBy: orderedBy,
    agreement: agreement,
    selectedPackage: selectedPackage,
    subsData: subsData,
    installmentData: installmentData,
  };
  //console.log(data)
  const res = await axios.post(
    `${url}/server/orders/create-by-vendor`,
    {
      userId: userId,
      facilites: facilites,
      selectedServices: selectedServices,
      serviceId: serviceId,
      type: type,
      amount: amount,
      description: description,
      offerPrice: offerPrice,
      deliveryDateFrom: deliveryDateFrom,
      deliveryDateTo: deliveryDateTo,
      orderedBy: orderedBy,
      agreement: agreement,
      selectedPackage: selectedPackage,
      subsData: subsData,
      installmentData: installmentData,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const createVendorOrderOffline = async (
  token,
  userId,
  facilites,
  selectedServices,
  serviceId,
  type,
  amount,
  description,
  offerPrice,
  deliveryDateFrom,
  deliveryDateTo,
  orderedBy,
  agreement,
  selectedPackage,
  subsData,
  installmentData
) => {

  //console.log(data)
  const res = await axios.post(
    `${url}/server/orders/offline/create`,
    {
      offlineMemberId: userId,
      facilites: facilites,
      selectedServices: selectedServices,
      serviceId: serviceId,
      type: type,
      amount: amount,
      description: description,
      offerPrice: offerPrice,
      deliveryDateFrom: deliveryDateFrom,
      deliveryDateTo: deliveryDateTo,
      orderedBy: orderedBy,
      agreement: agreement,
      selectedPackage: selectedPackage,
      subsData: subsData,
      installmentData: installmentData,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const getMemberId = async (token, serviceId, userId) => {
  const res = axios.get(
    `${url}/server/members/online/get-by-userid?serviceId=${serviceId}&&userId=${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};
export const deliverySubs = async (token, subsOrderId) => {
  const res = await axios.post(
    `${url}/server/orders/delivered-subs`,
    {
      subsOrderId: subsOrderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const receiveSubs = async (token, subsOrderId) => {
  const res = await axios.post(
    `${url}/server/orders/received-subs`,
    {
      subsOrderId: subsOrderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const refoundSubs = async (token, subsOrderId) => {
  const res = await axios.post(
    `${url}/server/orders/refunded-subs`,
    {
      subsOrderId: subsOrderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const rejectRefoundSubs = async (token, subsOrderId) => {
  const res = await axios.post(
    `${url}/server/orders/reject-refund-subs`,
    {
      subsOrderId: subsOrderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const acceptRefoundSubs = async (token, subsOrderId) => {
  const res = await axios.post(
    `${url}/server/orders/refunded-subs`,
    {
      subsOrderId: subsOrderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const vendorCancelSubs = async (token, subsOrderId) => {
  const res = await axios.post(
    `${url}/server/orders/vendor/cancel-subs`,
    {
      subsOrderId: subsOrderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const userCancelSubs = async (token, subsOrderId) => {
  const res = await axios.post(
    `${url}/server/orders/user/cancel-subs`,
    {
      subsOrderId: subsOrderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const getSubsOrderById = async (token, orderId) => {
  //console.log(`${url}/server/orders/get-by-id?orderId=${orderId}`)
  //console.log(token)
  const res = await axios.get(`${url}/server/orders/get-by-id/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};
export const userCancelInstallment = async (token, orderId) => {
  const res = await axios.post(
    `${url}/server/orders/user/cancel-installment`,
    {
      orderId: orderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const vendorCancelInstallment = async (token, orderId) => {
  const res = await axios.post(
    `${url}/server/orders/vendor/cancel-installment`,
    {
      orderId: orderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const makePaymentInstallment = async (
  token,
  orderId,
  installmentType,
  dateFrom,
  dateTo
) => {
  const res = await axios.post(
    `${url}/server/orders/make-payment-installment`,
    {
      orderId: orderId,
      installmentType: installmentType,
      dateFrom: dateFrom,
      dateTo: dateTo,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const makeAdvancedPaymentInstallment = async (token, orderId) => {
  const res = await axios.post(
    `${url}/server/orders/make-advanced-payment-installment`,
    {
      orderId: orderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const refoundInstallment = async (token, orderId) => {
  const res = await axios.post(
    `${url}/server/orders/refunded-installment`,
    {
      orderId: orderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
export const rejectRefoundInstallment = async (token, orderId) => {
  const res = await axios.post(
    `${url}/server/orders/reject-refund-installment`,
    {
      orderId: orderId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
