
const localOptionsToServer=async(data)=>{
    if(!Array.isArray(data)){
        console.log(null);
        return null;
    }
    let options;
    if(data[0].mainTitle&&data[0].title&&data[0].subTitle){
        let arr=[]
        let storeArray =[]
        data.map(d=>{
            arr.push(d.title)
        })
        arr=await uniq(arr)
        await arr.map((s,i)=>{
            let newOptions={}
            newOptions.`${s}`=titleDigging(s,data)
            options={...options,newOptions}
        })
    }else if(data[0].mainTitle&&data[0].title){
        options=[]
       await data.map(d=>{
        options.push({
            title:d.title,
            selectedOptions:optionDiggingWithTableNameAndTitle(d.title,d.tableName,data)
        })
      })
    }else{
        await options={
            title:data[0].mainTitle,
            selectedOptions:optionDiggingWithTableNameAndMainTitle(data[0].mainTitle,data[0].tableName,data)
        }
    }
    console.log(options)
    return options
}
const titleDigging=async(title,data)=>{
    let arr=[]
    await data.forEach(d=>{
        if(d.title==title){
            arr.push({
                title:d.subTitle,
                multiple:true,
                multiFormData:tableDiggingWithTitle(d.title,d.tableName,data)
            })
        }
    })
    return arr
}
const tableDiggingWithTitle=async(title,tableName,data)=>{
    let arr=[]
    await data.map(d=>{
        if(d.title==title&&d.tableName==tableName){
            arr.push({
                title:d.tableName,
                selectedOptions:optionDiggingWithTableNameAndSubTitle(d.subTitle,d.tableName,data)
            })
        }
    })
    return arr
}
const optionDiggingWithTableNameAndSubTitle=async(subTitle,tableName,data)=>{
    let arr = [];
    await data.map(d=>{
        if(d.tableName==tableName&&d.subTitle==subTitle){
            arr.push(d.data);
        }
    })
    return arr
}
const optionDiggingWithTableNameAndTitle=async(title,tableName,data)=>{
    let arr = [];
    await data.map(d=>{
        if(d.tableName==tableName&&d.title==title){
            arr.push(d.data);
        }
    })
    return arr
}
const optionDiggingWithTableNameAndMainTitle=async(mainTitle,tableName,data)=>{
    let arr = [];
    await data.map(d=>{
        if(d.tableName==tableName&&d.mainTitle==mainTitle){
            arr.push(d.data);
        }
    })
    return arr
}
function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }

  export {localOptionsToServer}