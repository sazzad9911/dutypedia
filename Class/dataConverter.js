import { AllData } from "../Data/AllData";

const localOptionsToServer = (data) => {
  if (!Array.isArray(data)) {
    console.log(null);
    return null;
  }
  
  if (data[0].mainTitle && data[0].title && data[0].subTitle) {
    let options={};
    let titleList = [];
    data.map((d) => {
      titleList.push(d.title);
    });
    titleList = uniq(titleList);

    titleList.map((s, i) => {
      options[s] = titleDigging(s,data)
    });
    return options
  } else if (data[0].mainTitle && data[0].title) {
    let options = [];
    let titleList=[];
    data.map(d=>{
      titleList.push(d.title);
    })
    titleList= uniq(titleList)
    titleList.map((d) => {
      options.push({
        title: d,
        selectedOptions: optionDiggingWithTableNameAndTitle(d,data),
      });
    });
    return options
  } else {
    let options = {
      title: data[0].mainTitle,
      selectedOptions: optionDiggingWithTableNameAndMainTitle(
        data[0].mainTitle,
        data[0].tableName,
        data
      ),
    };
    return options
  }
};
const titleDigging = (title, data) => {
  let arr = [];
  let subTitle=[]
  data.map(d=>{
    if(d.title==title){
      subTitle.push(d.subTitle)
    }
  })
  subTitle=uniq(subTitle)
  subTitle.map(d=>{
    arr.push({
      title:d,
      multiple:true,
      multiFormData:tableDiggingWithTitle(title, d,data)
    })
  })
  return arr;
};
const tableDiggingWithTitle = (title,subTitle, data) => {
  let arr = [];
  data.map((d) => {
    if(d.title==title&&d.subTitle==subTitle){
      arr.push({
        title:d.tableName,
        selectedOptions:optionDiggingWithTableNameAndSubTitle(title,subTitle,d.tableName,data)
      })
    }
  });
  return arr;
};
const optionDiggingWithTableNameAndSubTitle = (title,subTitle, tableName, data) => {
  let arr = [];
  data.map((d) => {
    if (d.tableName == tableName && d.subTitle == subTitle&&d.title == title) {
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
const serverToLocal = (data, category) => {
  if (Array.isArray(data)) {
    let arr = [];
    data.forEach((doc) => {
      let newData = AllData.filter((d) =>
        d.title.toUpperCase().includes(category.toUpperCase())
      )[0];
      doc.selectedOptions.map((option) => {
        let listData = newData.data.filter((d) => d.title == doc.title)[0].list;
        for (let i = 0; i < listData.length; i++) {
          let newArr = listData[i].data.filter((d) => d.title == option.title);
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
      });
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
export { localOptionsToServer, serverToLocal };
