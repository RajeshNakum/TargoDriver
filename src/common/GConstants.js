import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export function responsiveHeight(size = 0) {
  return heightPercentageToDP(size);
}

export function responsiveWidth(size = 0) {
  return widthPercentageToDP(size);
}

export const keyboards = {
  email: 'email-address',
  default: 'default',
  numeric: 'numeric',
};
