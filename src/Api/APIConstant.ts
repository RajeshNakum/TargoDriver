export const SERVER_URL = 'https://sarthitrans.com/logistics/';
export const BASE_URL = `${SERVER_URL}api/v1/`; //https://ordermanagement.store/logistics/api/v1/
export const IMAGE_URL = `${SERVER_URL}public/`;
// export const SOCKET_URL = `https://ordermanagement.store`;

export const API_CONSTANT = {
  HeaderLanguage: 'en',
};

export const Method = {
  // AUTH
  LOGIN: 'login',
  REGISTER: 'register',
  OTP_VERIFICATION: 'otp-verification',
  UPDATE_PROFILE: 'profile/update',
  GET_USER: 'profile/view',
  KYC_UPLOAD_DOCUMENT: 'kyc/documents/store',
  KYC_OTP_VERIFICATION: 'kyc/otp-verification',
  KYC_UPLOAD_USER_IMAGE: 'kyc/upload-kyc-user-image',
  KYC_GET_DOCUMENT: 'kyc/documents',
  LOGOUT: 'logout',
  STATUS_UPDATE: 'statusUpdate',

  POST_LOAD_LIST: 'post-load',
  POST_LOAD: 'post-load',
  GET_BANNER: 'banners/list',
  GET_VEHICALE: 'vehicles',
  GET_LOAD_LIST: 'post-load/requests/list',
  LOAD_ACCEPT_REJECT_ACTION: 'post-load/action',

  // setting Apis
  GET_FAQ: 'faqs/list',
  SEND_HELP: 'help',
  SEND_FEEDBACK: 'feedback',

  // Chat Api
  CHAT_LIST: 'chat/list',
  CHAT_VIEW: 'chat/view',
  CHAT_ADD: 'chat/create',

  //vehicle
  VEHICLE_TYPE_LIST: 'vehicle-types/list',
  VEHICLE_LIST: 'vehicles',
  VEHICLE: 'vehicles',
};

export const UserType = {
  // AUTH
  CUSTOMER: '3',
  DRIVER: '4',
  TRUCK: '5',
};

export const StatusCode = {
  INVALID_REQ: '0',
  SUCCESS: '1',
  NO_DATA: '2',
  ACCOUNT_INACTIVE: '3',
  OTP_VERIFICATION: '4',
  EMAIL_VERIFICATION: '5',
  FORCE_UPDATE: '6',
  SIMPLE_APP_UPDATE_ALERT: '7',
  UNDER_MAINTENANCE: '8',
  SOCIAL_ID_NOT_REGISTERED: '11',
};

export const Pref = {
  USER_DATA_PREF: 'loginUserData',
  USER_TOKEN: 'authToken',
  IS_USER_LOGIN_PREF: 'isUserLogin',
  SOCKET_ID: 'socketID',
  USER_KYC: 'isuserkyc',
};

export const otherApis = {};
