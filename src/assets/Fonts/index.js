import {
  ScaledSheet,
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

export const Fonts = {
  Light: 'Inter-Light',
  Regular: 'Inter-Regular',
  Medium: 'Inter-Medium',
  SemiBold: 'Inter-SemiBold',
  Bold: 'Inter-ExtraBold',
  ExtraBold: 'Inter-ExtraBold',
  DM_Light: 'DMSans-Light',
  DM_Regular: 'DMSans-Regular',
  DM_Medium: 'DMSans-Medium',
  DM_SemiBold: 'DMSans-SemiBold',
  DM_Bold: 'DMSans-Bold',
  DM_Regular_Italic: 'DMSans-Italic',
  DM_SeniBold_Italic: 'DMSans-SemiBoldItalic',
};

export const FontSize = {
  _35: 35,
  _32: 32,
  _30: 30,
  _28: 28,
  _26: 26,
  _25: 25,
  _24: 24,
  _23: 23,
  _22: 22,
  _21: 21,
  _20: 20,
  _19: 19,
  _18: 18,
  _17: 17,
  _16: 16,
  _15: 15,
  _14: 14,
  _13: 13,
  _12: 12,
  _11: 11,
  _10: 10,
};

export function normalize(size) {
  return moderateScale(size);
}
