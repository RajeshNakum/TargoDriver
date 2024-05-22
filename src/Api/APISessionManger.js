import AsyncStorage from '@react-native-async-storage/async-storage';
import * as APIConstant from './APIConstant';

let _userData = undefined;
let _isUserLogin = false;

const Pref = APIConstant.Pref;

function setUserData(userDataResponse) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.setItem(
        Pref.USER_DATA_PREF,
        JSON.stringify(userDataResponse),
      )
        .then(() => resolve(true))
        .catch(e => reject(e));
    } catch (e) {
      // save error
      reject(e);
      console.log('setUser Data ==> ', e);
    }
  });
}

function getUserData() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(Pref.USER_DATA_PREF)
        .then(data => resolve(JSON.parse(data)))
        .catch(e => reject(e));
    } catch (e) {
      // read error
      reject(e);
      console.log('getUser Data ==> ', e);
    }
  });
}

function setUserLogin(isUserLogin) {
  return new Promise((resolve, reject) => {
    _isUserLogin = JSON.stringify(isUserLogin);
    try {
      AsyncStorage.setItem(Pref.IS_USER_LOGIN_PREF, _isUserLogin)
        .then(() => resolve(true))
        .catch(e => reject(e));
    } catch (e) {
      reject(e);
      console.log('setUser Data ==> ', e);
    }
  });
}

function setDeviceId(uniqueId) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.setItem(Pref.DEVICE_ID, uniqueId)
        .then(() => resolve(true))
        .catch(e => reject(e));
    } catch (e) {
      // save error
      reject(e);
      console.log('setUser UniqueID ==> ', e);
    }
  });
}

function getDeviceId() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(Pref.DEVICE_ID)
        .then(data => resolve(data))
        .catch(e => reject(e));
    } catch (e) {
      // read error
      reject(e);
      console.log('getUser Data ==> ', e);
    }
  });
}

function setSocketId(socketId) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.setItem(Pref.SOCKET_ID, socketId)
        .then(() => resolve(true))
        .catch(e => reject(e));
    } catch (e) {
      // save error
      reject(e);
      console.log('set SOCKET_ID ==> ', e);
    }
  });
}

function getSocketId() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(Pref.SOCKET_ID)
        .then(data => resolve(data))
        .catch(e => reject(e));
    } catch (e) {
      // read error
      reject(e);
      console.log('get SOCKET_ID ==> ', e);
    }
  });
}

function getUserLogin() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(Pref.IS_USER_LOGIN_PREF)
        .then(data => {
          resolve(JSON.parse(data));
        })
        .catch(e => reject(e));
    } catch (e) {
      // read error
      reject(e);
      console.log('getUser Data ==> ', e);
    }
  });
}

function setUserToken(token) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.setItem(Pref.USER_TOKEN, token)
        .then(() => resolve(true))
        .catch(e => reject(e));
    } catch (e) {
      reject(e);
      console.log('setUser Data ==> ', e);
    }
  });
}

function getUserToken() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(Pref.USER_TOKEN)
        .then(data => resolve(data))
        .catch(e => reject(e));
    } catch (e) {
      // read error
      reject(e);
      console.log('getUser Data ==> ', e);
    }
  });
}

function setIsUserKYC(isUserLogin) {
  return new Promise((resolve, reject) => {
    _isUserLogin = JSON.stringify(isUserLogin);
    try {
      AsyncStorage.setItem(Pref.USER_KYC, _isUserLogin)
        .then(() => resolve(true))
        .catch(e => reject(e));
    } catch (e) {
      reject(e);
      console.log('setUser Data ==> ', e);
    }
  });
}

function getIsUserKYC() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(Pref.USER_KYC)
        .then(data => {
          resolve(JSON.parse(data));
        })
        .catch(e => reject(e));
    } catch (e) {
      // read error
      reject(e);
      console.log('getUser Data ==> ', e);
    }
  });
}

function removeAll() {
  _userData = undefined;
  return AsyncStorage.multiRemove([
    Pref.USER_DATA_PREF,
    Pref.USER_TOKEN,
    Pref.IS_USER_LOGIN_PREF,
    Pref.USER_KYC
  ]);
}

export default {
  setUserData,
  getUserData,
  setUserLogin,
  getUserLogin,
  setUserToken,
  getUserToken,
  setDeviceId,
  getDeviceId,
  setSocketId,
  getSocketId,
  setIsUserKYC,
  getIsUserKYC,
  removeAll,
};
