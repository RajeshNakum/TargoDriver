import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors} from '../../../common/colors';
import {Fonts, normalize} from '../../../assets';

const Pagination = ({index, ContainerStyle, isCountHide, totalCount}) => (
  <View
    style={[
      {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: widthPercentageToDP(0),
      },
      ContainerStyle,
    ]}>
    {isCountHide ? null : (
      <Text
        style={{
          color: Colors.White,
          fontFamily: Fonts.Regular,
          fontSize: normalize(18),
        }}>
        {`Step   `}
        <Text
          style={{
            color: Colors.White,
            fontFamily: Fonts.SemiBold,
            fontSize: normalize(18),
          }}>{`${index}`}</Text>
        /{totalCount.length}
      </Text>
    )}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: heightPercentageToDP(2),
      }}>
      {totalCount.map((item, stepIndex) => (
        <View
          style={{
            backgroundColor:
              index > stepIndex ? Colors.White : Colors.LightGrey,
            width: widthPercentageToDP(12),
            height: 6,
            borderRadius: 20,
            marginHorizontal: widthPercentageToDP(1),
          }}></View>
      ))}
      {/* <View style={{ backgroundColor: index > 0 ? color.themeColor : color.gray30, width: widthPercentageToDP(10), height: 6, borderRadius: 20, marginHorizontal: widthPercentageToDP(1) }}></View>
            <View style={{ backgroundColor: index > 1 ? color.themeColor : color.gray30, width: widthPercentageToDP(10), height: 6, borderRadius: 20, marginHorizontal: widthPercentageToDP(1) }}></View>
            <View style={{ backgroundColor: index > 2 ? color.themeColor : color.gray30, width: widthPercentageToDP(10), height: 6, borderRadius: 20, marginHorizontal: widthPercentageToDP(1) }}></View>
            <View style={{ backgroundColor: index > 3 ? color.themeColor : color.gray30, width: widthPercentageToDP(10), height: 6, borderRadius: 20, marginHorizontal: widthPercentageToDP(1) }}></View>
            <View style={{ backgroundColor: index > 4 ? color.themeColor : color.gray30, width: widthPercentageToDP(10), height: 6, borderRadius: 20, marginHorizontal: widthPercentageToDP(1) }}></View>
            <View style={{ backgroundColor: index > 5 ? color.themeColor : color.gray30, width: widthPercentageToDP(10), height: 6, borderRadius: 20, marginHorizontal: widthPercentageToDP(1) }}></View> */}
    </View>
  </View>
);

export default Pagination;
