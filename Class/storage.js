import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      throw new Error(e);
    }
}
const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // value previously stored
        return value
      }else {
        throw new Error('Could not find value')
      }
    } catch(e) {
      // error reading value
      throw new Error(e);
    }
  }
  const storeJson = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
      return e
    }
  }
  const getJson = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      return e
    }
  }

  export {
    storeData,getData,storeJson,getJson
  }