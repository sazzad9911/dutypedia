import { url } from "../action";
import axios from "axios";
import { localOptionsToServer } from "../Class/dataConverter";
import DateTime from "./../screens/Seller/DateTime";


const timePick=(date)=>{
  date=new Date(date)
  return `${date.getHours()}:${date.getMinutes()}`
}

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
      das[0].match(text[0].toUpperCase()) &&
      das[1].match(text[1].toUpperCase()) &&
      das[2].match(text[2].toUpperCase())
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

  const options = {
    method: "POST",
    headers: myHeaders,
    body: formData,
  };
 let result=await axios
    .post(`${url}/server/services/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(err =>{
        console.warn(err.response.data.msg);
    })
    if(result){
        return result.data
    }
    return false;
};
export const getService = async (token) => {
  const myHeaders = new Headers();
  //const formData=new FormData()
  myHeaders.append("Authorization", `Bearer ${token}`);
  const options = {
    method: "GET",
    headers: myHeaders,
  };
  const result = await fetch(`${url}/server/services/get`, options);
  if (result) {
    return result.json();
  }
  return false;
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
const createNewService = async (req, res) => {
  const { data, serviceImages, profilePhotoUrl, wallPhotoUrl } = req.body;
  console.log(data);
  const { id } = req.user;
  if (!data) {
    throw new BadRequestError("Please provide all values!");
  }
  if (!serviceImages) {
    throw new BadRequestError("Invalid images or images are too big!");
  }
  if (serviceImages?.length < 4) {
    throw new BadRequestError("Please upload all 4 images!");
  }
  const extUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!extUser) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  if (extUser.loginAs !== "USER") {
    throw new UnAuthenticatedError("You are not authorized to create service!");
  }

  const category = data.optionsData.category;
  const dashboard = data.dashboard;
  const about = data.uploadServiceData.about;
  const speciality = data.uploadServiceData.speciality;
  const serviceCenterName = data.selectServiceData.serviceName;
  const providerInfo = {
    title: data.selectServiceData.providerTitle,
    name: data.selectServiceData.providerName,
    gender: data.selectServiceData.gender,
    position: data.selectServiceData.position,
  };
  const worker = Number(data.selectServiceData.worker);
  const startDate = data.selectServiceData.startDate;
  const workingTime = data.selectServiceData.workingTime;
  const t47 = data.selectServiceData.t47;

  //Gigs data
  const title = data.uploadServiceData.title;
  const price = Number(data.selectServiceData.startingPrice);
  const facilites = data.selectServiceData.facilites;
  const services = data.optionsData;
  const description = data.uploadServiceData.description;

  //Location data
  const region = data.serviceLocationData.state;
  const city = data.serviceLocationData.city;
  const area = data.serviceLocationData.area;
  const address = data.serviceLocationData.address;

  if (
    !category ||
    !title ||
    !speciality ||
    !description ||
    !about ||
    !serviceCenterName ||
    !providerInfo ||
    !worker ||
    !startDate ||
    !workingTime ||
    !price ||
    !services ||
    !dashboard
  ) {
    throw new BadRequestError("Please provide all values");
  }

  //Check for duplicate service center
  const existingServices = await prisma.service.findMany({
    where: { userId: id },
  });

  if (existingServices.length) {
    const existingDashboard = existingServices.find(
      (service) => service.serviceCenterName === serviceCenterName
    );
    if (existingDashboard) {
      throw new BadRequestError("You already have a service with this name!");
    }
  }

  const serviceId = nanoid();
  const service = prisma.service.create({
    data: {
      id: serviceId,
      category,
      about,
      speciality,
      serviceCenterName,
      providerInfo,
      worker,
      startDate,
      workingTime,
      t47,
      dashboard,
      ...(profilePhotoUrl && { profilePhoto: profilePhotoUrl }),
      ...(wallPhotoUrl && { wallPhoto: wallPhotoUrl }),
      location: {
        create: {
          region,
          city,
          area,
          address,
        },
      },
      gigs: {
        create: {
          title,
          price,
          facilites,
          services,
          description,
          images: serviceImages,
        },
      },
      user: {
        connect: {
          id: id,
        },
      },
    },
  });
  const user = prisma.user.update({
    where: {
      id,
    },
    data: {
      role: "VENDOR",
      loginAs: "VENDOR",
      activeDashboardId: serviceId,
    },
  });

  const resp = await prisma.$transaction([service, user]);

  res.status(StatusCodes.CREATED).json({
    service: resp[0],
    token: createJWT(resp[1]),
  });
};
