import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

// import {renderIf} from '../../utils/validation';
import Icon from '../Other/Icon';
import {renderIf} from '../../utils/validation';
import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';

export const ThemeButton = ({
  title,
  action,
  style,
  styleText,
  disabled,
  loading,
  showLoading = false,
  rightIcon,
  rightIconType,
  rightIconName,
  leftIcon,
  leftIconName,
  leftIconType,
  iconColor,
  rightIconColor,
}) => {
  //   const isPending = useSelector(state => state.app.pending);
  const disableButton = disabled;

  return (
    <TouchableOpacity
      disabled={disableButton}
      style={[
        {
          backgroundColor: disableButton ? Colors.grey30 : Colors.PrimaryFirst,
          borderColor: disableButton ? Colors.greyLight : Colors.PrimaryFirst,
        },
        styles.submitBtn,
        styles.center,
        style,
      ]}
      onPress={action ? () => action() : null}>
      {renderIf(
        leftIcon,
        <View style={{marginRight: wp(2)}}>
          <Icon
            type={leftIconType}
            name={leftIconName}
            size={20}
            color={iconColor || Colors.White}
          />
        </View>,
      )}
      {showLoading ? (
        <View style={styles.containerLoader}>
          <ActivityIndicator color={Colors.White} />
        </View>
      ) : (
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          // adjustsFontSizeToFit
          style={[
            disableButton
              ? {color: Colors.PrimaryGrey}
              : {color: Colors.White},
            styles.submitBtnText,
            styleText,
          ]}>
          {!loading ? title : <ActivityIndicator color="black" />}
        </Text>
      )}
      {renderIf(
        rightIcon,
        <View style={{marginLeft: wp(2)}}>
          <Icon
            type={rightIconType}
            name={rightIconName}
            size={20}
            color={rightIconColor || Colors.White}
          />
        </View>,
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  center: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
  },
  submitBtn: {
    paddingHorizontal: wp('1.8%'),
    borderRadius: 10,
    borderWidth: 1,
  },
  submitBtnText: {
    fontSize: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.DM_Medium,
  },
  containerLoader: {
    width: wp('17%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
  },
});
