import {showMessage} from 'react-native-flash-message';

export const showError = (message, subTitle) => {
  showMessage({
    message: message,
    description: subTitle,
    type: 'danger',
    duration: 3000,
    icon: 'danger',
    style: {paddingTop: 40, paddingBottom: 10},
  });
};

export const showSuccess = (message, subTitle) => {
  showMessage({
    message: message,
    description: subTitle,
    type: 'success',
    duration: 3000,
    icon: 'success',
    style: {paddingTop: 40, paddingBottom: 10},
  });
};

let loaderRef;

export const setLoaderRef = ref => {
  loaderRef = ref;
};

export const toggleLoader = (showLoader, title) => {
  if (loaderRef) {
    loaderRef.toggleLoader(showLoader, title);
  }
};
