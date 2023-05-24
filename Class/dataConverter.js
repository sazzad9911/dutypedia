import { allTimeConverter } from "../action";
import { AllData } from "../Data/AllData";

const localOptionsToServer = (data) => {
  if (!Array.isArray(data)) {
    console.log(null);
    return null;
  }

  if (data[0].mainTitle && data[0].title && data[0].subTitle) {
    let options = {};
    let titleList = [];
    data.map((d) => {
      titleList.push(d.title);
    });
    titleList = uniq(titleList);

    titleList.map((s, i) => {
      options[s] = titleDigging(s, data);
    });
    return options;
  } else if (data[0].mainTitle && data[0].title) {
    let options = [];
    let titleList = [];
    data.map((d) => {
      titleList.push(d.title);
    });
    titleList = uniq(titleList);
    titleList.map((d) => {
      options.push({
        title: d,
        selectedOptions: optionDiggingWithTableNameAndTitle(d, data),
      });
    });
    return options;
  } else {
    let options = {
      title: data[0].mainTitle,
      selectedOptions: optionDiggingWithTableNameAndMainTitle(
        data[0].mainTitle,
        data[0].tableName,
        data
      ),
    };
    return options;
  }
};
const titleDigging = (title, data) => {
  let arr = [];
  let subTitle = [];
  data.map((d) => {
    if (d.title == title) {
      subTitle.push(d.subTitle);
    }
  });
  subTitle = uniq(subTitle);
  subTitle.map((d) => {
    arr.push({
      title: d,
      multiple: true,
      multiFormData: tableDiggingWithTitle(title, d, data),
    });
  });
  return arr;
};
const tableDiggingWithTitle = (title, subTitle, data) => {
  let arr = [];
  let tableName = [];
  data.map((d, i) => {
    if (d.title == title && d.subTitle == subTitle) {
      tableName.push(d.tableName);
    }
  });
  tableName = uniq(tableName);
  tableName.map((d) => {
    arr.push({
      title: d,
      selectedOptions: optionDiggingWithTableNameAndSubTitle(
        title,
        subTitle,
        d,
        data
      ),
    });
  });
  return arr;
};
const optionDiggingWithTableNameAndSubTitle = (
  title,
  subTitle,
  tableName,
  data
) => {
  let arr = [];
  data.map((d) => {
    if (
      d.tableName == tableName &&
      d.subTitle == subTitle &&
      d.title == title
    ) {
      arr.push(d.data);
    }
  });
  return arr;
};

const optionDiggingWithTableNameAndTitle = (title, data) => {
  let arr = [];
  data.map((d) => {
    if (d.title == title) {
      arr.push(d.data);
    }
  });
  return arr;
};
const optionDiggingWithTableNameAndMainTitle = (mainTitle, tableName, data) => {
  let arr = [];
  data.map((d) => {
    if (d.tableName == tableName && d.mainTitle == mainTitle) {
      arr.push(d.data);
    }
  });
  return arr;
};
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
const serverToLocalOld = (data, category) => {
  if (Array.isArray(data)) {
    let arr = [];
    data.forEach((doc) => {
      let newData = AllData.filter((d) => d.key == category)[0];
      if (doc.selectedOptions) {
        doc.selectedOptions.map((option) => {
          let listData = newData.data.filter((list) => list.title == doc.title);
          if (listData.length > 0) {
            //console.log(listData)
            listData = listData[0].list;
            for (let i = 0; i < listData.length; i++) {
              let newArr = listData[i].data.filter(
                (dd) => dd.title == option.title
              );
              if (newArr && newArr.length > 0) {
                let tableName = listData[i].title;
                arr.push({
                  mainTitle: newData.title,
                  title: doc.title,
                  tableName: tableName,
                  data: option,
                });
                break;
              }
            }
          }
        });
      } else if (doc.multiFormData) {
        doc.multiFormData.map((doc) => {
          let sub = doc?.title;
          console.log(sub);
          doc.selectedOptions.map((option) => {
            let listData = newData.data.filter(
              (list) => list.title == doc.title
            );
            if (listData.length > 0) {
              //console.log(listData)
              listData = listData[0].list;
              for (let i = 0; i < listData.length; i++) {
                let newArr = listData[i].data.filter(
                  (dd) => dd.title == option.title
                );
                if (newArr && newArr.length > 0) {
                  let tableName = listData[i].title;
                  arr.push({
                    mainTitle: newData.title,
                    subTitle: sub,
                    title: doc.title,
                    tableName: tableName,
                    data: option,
                  });
                  break;
                }
              }
            }
          });
        });
      }
    });
    return arr;
  } else if (data.selectedOptions) {
    let arr = [];
    data.selectedOptions.forEach((doc) => {
      arr.push({
        mainTitle: data.title,
        tableName: data.title,
        data: doc,
      });
    });
    return arr;
  } else if (!data.title) {
    let arr = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        //console.log(key + " -> " + data[key]);
        let newData = AllData.filter((d) =>
          d.title.toUpperCase().includes(category.toUpperCase())
        )[0];
        let mainTitle = newData.title;
        let title = key;
        data[key].map((doc) => {
          let subTitle = doc.title;
          doc.multiFormData.map((m) => {
            let tableName = m.title;
            m.selectedOptions.map((s) => {
              arr.push({
                mainTitle: mainTitle,
                title: title,
                subTitle: subTitle,
                tableName: tableName,
                data: s,
              });
            });
          });
        });
      }
    }
    return arr;
  } else {
    return [];
  }
};
const DATA = [
  {
    title: "Builder Services",
    key: "BUIDLER",
  },
  {
    title: "Business Services",
    key: "BUSINESS",
  },
  {
    title: "Cooker Service",
    key: "COOKER",
  },
  {
    title: "Electrician & Mechanician",
    key: "ELECTRICIAN",
  },
  {
    title: "Entertainment",
    key: "ENTERTAINMENT",
  },
  {
    title: "House Keeper",
    key: "HOUSEKEEPER",
  },
  {
    title: "It & Technology",
    key: "IT",
  },
  {
    title: "Lawyer Service",
    key: "LAWYER",
  },
  {
    title: "Music & Audio Service",
    key: "MUSIC",
  },
  {
    title: "Painter",
    key: "PAINTER",
  },
  {
    title: "Online Tution",
    key: "ONLINETUTION",
  },
  {
    title: "Parlour & Saloon",
    key: "PARLOUR",
  },
  {
    title: "Labor",
    key: "LABOR",
  },
  {
    title: "Life Style",
    key: "LIFESTYLE",
  },
];
const serverToLocalNew = (options, category) => {
  let mainTitle = DATA.filter((d) => d.key.match(category))[0].title;
  let arr = [];
  if (options?.selectedOptions) {
    options.selectedOptions.forEach((doc) => {
      arr.push({
        mainTitle: mainTitle,
        tableName: options?.title,
        data: doc,
      });
    });
  } else if (Array.isArray(options)) {
    options.forEach((doc) => {
      let title = doc?.title;
      if (doc.selectedOptions) {
        doc.selectedOptions.forEach((d) => {
          arr.push({
            mainTitle: mainTitle,
            title: title,
            tableName: doc?.title,
            data: d,
          });
        });
      } else if (doc.multiFormData) {
        doc.multiFormData.forEach((d) => {
          let subTitle = d?.title;
          d.selectedOptions.forEach((e) => {
            arr.push({
              mainTitle: mainTitle,
              title: title,
              subTitle: subTitle,
              tableName: d?.title,
              data: e,
            });
          });
        });
      }
    });
  } else if (!options.title) {
    for (var key in options) {
      let title = key;
      options[key].forEach((doc) => {
        let subTitle = doc?.title;
        doc?.multiFormData?.forEach((d) => {
          let tableName = d?.title;
          d.selectedOptions.forEach((e) => {
            arr.push({
              mainTitle: mainTitle,
              title: title,
              subTitle: subTitle,
              tableName: tableName,
              data: e,
            });
          });
        });
      });
    }
  }
  return arr;
};
const serverToLocal = (options, category) => {
  let mainTitle = DATA.filter((d) => d.key.match(category))[0].title;
  let arr = [];
  if (options?.selectedOptions) {
    options.selectedOptions.forEach((doc) => {
      arr.push({
        mainTitle: mainTitle,
        tableName: options?.title,
        data: doc,
      });
    });
  } else if (options?.customOptions) {
    options.customOptions.forEach((doc) => {
      arr.push({
        mainTitle: mainTitle,
        tableName: options?.title,
        data: doc,
      });
    });
  } else if (Array.isArray(options)) {
    options.forEach((doc) => {
      let title = doc?.title;
      if (doc.selectedOptions) {
        doc?.selectedOptions?.forEach((d) => {
          arr.push({
            mainTitle: mainTitle,
            title: title,
            tableName: doc?.title,
            data: d,
          });
        });
        doc?.customOptions?.forEach((d) => {
          arr.push({
            mainTitle: mainTitle,
            title: title,
            tableName: doc?.title,
            data: d,
          });
        });
      } else if (doc.multiFormData) {
        doc.multiFormData.forEach((d) => {
          let subTitle = d?.title;
          d?.selectedOptions?.forEach((e) => {
            arr.push({
              mainTitle: mainTitle,
              title: title,
              subTitle: subTitle,
              tableName: d?.title,
              data: e,
            });
          });
          d.customOptions?.forEach((e) => {
            arr.push({
              mainTitle: mainTitle,
              title: title,
              subTitle: subTitle,
              tableName: d?.title,
              data: e,
            });
          });
        });
      }
    });
  } else if (!options.title) {
    for (var key in options) {
      let title = key;
      options[key].forEach((doc) => {
        let subTitle = doc?.title;
        doc?.multiFormData?.forEach((d) => {
          let tableName = d?.title;
          d?.selectedOptions?.forEach((e) => {
            arr.push({
              mainTitle: mainTitle,
              title: title,
              subTitle: subTitle,
              tableName: tableName,
              data: e,
            });
          });
          d?.customOptions?.forEach((e) => {
            arr.push({
              mainTitle: mainTitle,
              title: title,
              subTitle: subTitle,
              tableName: tableName,
              data: e,
            });
          });
        });
      });
    }
  }
  return arr;
};
const serverTimeToLocalTime = (object) => {
  return {
    title: object?.day,
    openingTime: new Date(`2010-11-12T${object?.open}`),
    closingTime: new Date(`2010-11-12T${object?.close}`),
  };
};
const mixDateTime = (date, time) => {
  //date formate 2010-01-05
  //time format 22:10
  return new Date(`${date}T${time}`);
};
const localTimeToServerTime = (object) => {
  return {
    day: object?.title,
    open: allTimeConverter(object?.openingTime),
    close: allTimeConverter(object?.closingTime),
  };
};
const convertServerFacilities = (facilities) => {
  let arr = [];
  facilities?.selectedOptions?.map((doc) => {
    arr.push({
      id:doc?.id,
      title:doc?.title,
      checked:true
    });
  });
  facilities?.customOptions?.map((doc) => {
    arr.push({
      id:doc?.id,
      title:doc?.title,
      checked:true
    });
  });
  return arr;
};
const convertLocalFacilities = (data) => {
  return {
    title: "Selected Options",
    selectedOptions: data,
  };
};

export {
  localOptionsToServer,
  serverToLocal,
  serverToLocalNew,
  serverTimeToLocalTime,
  localTimeToServerTime,
  convertLocalFacilities,
  convertServerFacilities,
};
