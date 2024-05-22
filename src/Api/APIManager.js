import React from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as APIConstant from './APIConstant';
import APISessionManger from './APISessionManger';
import {showError, showSuccess, toggleLoader} from '../config/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
const BASE_URL = APIConstant.BASE_URL;
const API_CONSTANT = APIConstant.API_CONSTANT;

const headerConfig = (async = {
  'Content-Type': 'application/json',
});

const headerMultiPartConfig = (async = {
  'Content-Type': 'multipart/form-data',
});

//API Manager Class
export default class APIManager {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected;
  }

  //Common convert param to form data
  //----------------------------------------------------------------------------
  static commonFormData = dictParam => {
    var formBody = [];
    for (var property in dictParam) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(dictParam[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    return formBody;
  };

  //API Calls
  //POST Api ----------------------------------------------------------------------------

  static callPostApi = async (endpoint, param, props, callback) => {
    const isConnected = await this.isNetworkAvailable(); // Check Internet Connectivity
    if (isConnected == true) {
      let headerConfigwithToken = headerConfig;

      let usertoken = await APISessionManger.getUserToken();

      // IF - token available
      if (usertoken) {
        let token = {
          Authorization: `Bearer ${usertoken}`,
        };
        if (param.isFormData == true) {
          headerConfigwithToken = {
            ...headerMultiPartConfig,
            ...token,
          };
        } else {
          headerConfigwithToken = {...headerConfig, ...token};
        }
      }

      console.log(
        '============= bBASE_URL + endpoint ===========',
        BASE_URL + endpoint,
      );
      console.log(
        '============= headerConfigwithToken ===========',
        headerConfigwithToken,
      );

      let data;
      if (param.isFormData == true) {
        console.log(' ============= if Form data ==============');
        var formData = new FormData();
        for (var i in param) {
          formData.append(i, param[i]);
        }
        console.log('api response :', param);
        data = formData;
      } else {
        console.log(' ============= else stringify data ==============');
        data = JSON.stringify(param);
      }

      console.log('check user data  ===> ', data);
      await axios
        .post(BASE_URL + endpoint, data, {headers: headerConfigwithToken})
        .then(response => {
          // console.log('==============response1=================', response.data);
          toggleLoader(false);
          // if (response.data.status == 1) {
          callback(response.data, null);
          // } else {
          //   showError(response.data.message, '');
          //   callback(response.data, null);
          // }
        })
        .catch(error => {
          console.log(
            '==================== error res =============== ',
            error.response?.data,
          );
          showError(error.response?.data?.message);
          toggleLoader(false);
          if (error.code === 'ECONNABORTED') {
            showError('Time out');
            callback(null, error);
          } else if (
            error.response.status == 401 ||
            error.response.status == 403
          ) {
            APISessionManger.removeAll();
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'LoginScreen'}],
              }),
            );
          } else {
            toggleLoader(false);
          }
        });
    } else {
      showError('No Internet connection');
    }
  };

  //----------------------------------------------------------------------------

  //GET Api  ----------------------------------------------------------------------------

  static callGetApi = async (endpoint, dictParam, props, callback) => {
    const isConnected = await this.isNetworkAvailable();
    console.log('check internet is available or not ==> ', isConnected);

    if (isConnected == true) {
      let headerConfigwithToken = headerConfig;

      let usertoken = await APISessionManger.getUserToken();

      console.log("i'm in token===>", usertoken);
      if (usertoken) {
        let token = {
          Authorization: `Bearer ${usertoken}`,
        };
        headerConfigwithToken = {...headerConfig, ...token};
      }

      // console.log("i'm in Token ===", token);
      // const headerConfigwithToken = { ...headerConfig, ...token };

      console.log("i'm in headerConfigwithToken ===> ", headerConfigwithToken);

      axios
        .get(BASE_URL + endpoint, {headers: headerConfigwithToken})
        .then(response => {
          // Handle successful response
          // if (response.data.status == 1) {
          toggleLoader(false);
          callback(response.data, null);
          // } else {
          //   showError(response.data.message, '');
          //   callback(response.data, null);
          // }
        })
        .catch(error => {
          console.log(
            '==================== error res =============== ',
            error.response?.data,
          );
          showError(error.response?.data?.message);
          toggleLoader(false);
          if (error.code === 'ECONNABORTED') {
            showError('Time out');
            callback(null, error);
          } else if (
            error.response.status == 401 ||
            error.response.status == 403
          ) {
            APISessionManger.removeAll();
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'LoginScreen'}],
              }),
            );
          } else {
            toggleLoader(false);
          }
        });
    } else {
      // toggleLoader(false);
      showError('No Internet connection');
    }
  };

  static callDeleteApi = async (endpoint, dictParam, props, callback) => {
    const isConnected = await this.isNetworkAvailable();
    console.log('check internet is available or not ==> ', isConnected);

    if (isConnected == true) {
      let headerConfigwithToken = headerConfig;

      let usertoken = await APISessionManger.getUserToken();

      console.log("i'm in token===>", usertoken);
      if (usertoken) {
        let token = {
          Authorization: `Bearer ${usertoken}`,
        };
        headerConfigwithToken = {...headerConfig, ...token};
      }

      // console.log("i'm in Token ===", token);
      // const headerConfigwithToken = { ...headerConfig, ...token };

      console.log("i'm in BASE_URL + endpoint ===> ", BASE_URL + endpoint);

      axios
        .delete(BASE_URL + endpoint, {headers: headerConfigwithToken})
        .then(response => {
          // Handle successful response
          // if (response.data.status == 1) {
          toggleLoader(false);
          callback(response.data, null);
          // } else {
          //   showError(response.data.message, '');
          //   callback(response.data, null);
          // }
        })
        .catch(error => {
          console.log(
            '==================== error res =============== ',
            error.response?.data,
          );
          showError(error.response?.data?.message);
          toggleLoader(false);
          if (error.code === 'ECONNABORTED') {
            showError('Time out');
            callback(null, error);
          } else if (
            error.response.status == 401 ||
            error.response.status == 403
          ) {
            APISessionManger.removeAll();
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'LoginScreen'}],
              }),
            );
          } else {
            toggleLoader(false);
          }
        });
    } else {
      // toggleLoader(false);
      showError('No Internet connection');
    }
  };
}
