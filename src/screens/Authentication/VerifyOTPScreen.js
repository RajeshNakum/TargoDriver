import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import CustomPhoneInput from '../../components/Input/CustomPhoneInput';
import {ThemeButton} from '../../components/Button/themeButton';
import {isMobile} from '../../utils/validation';
import OtpInput from '../../components/Input/OtpInput';
import {Method, UserType} from '../../Api/APIConstant';
import APIManager from '../../Api/APIManager';
import {showError, showSuccess, toggleLoader} from '../../config/functions';
import DeviceInfo from 'react-native-device-info';
import APISessionManger from '../../Api/APISessionManger';

function VerifyOTPScreen(props) {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [appVersion, setAppVersion] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [seconds, setSeconds] = useState(10);

  // UseEffect - set phone number  , userId and country code  -- call function GetDeviceDetails
  useEffect(() => {
    // setCallingCode(props.route.params.phoneNumber.callingCode);
    // setPhoneNumber(props.route.params.phoneNumber.phoneNumber);
    setEmail(props.route.params.email);
    setUserId(props.route.params.userId);

    getDeviceDetails();
  }, []);

  // UseEffect - calculate second for resend otp
  useEffect(() => {
    // If seconds are greater than 0, set a timer to decrease the seconds
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else {
      // Once the countdown reaches 0, clear the interval
      clearInterval(interval);
    }
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [seconds]);

  //  Function - Get device details
  const getDeviceDetails = () => {
    DeviceInfo.getDeviceName().then(deviceName => {
      setDeviceName(deviceName);
    });
    let deviceId = DeviceInfo.getDeviceId();
    let buildNumber = DeviceInfo.getBuildNumber();
    let systemVersion = DeviceInfo.getSystemVersion();

    setDeviceId(deviceId);
    setAppVersion(buildNumber);
    setOsVersion(systemVersion);
  };

  // Validation - check validation for otp
  const validation = () => {
    console.log('otp otp', otp);
    if (otp.length < 6) {
      showError('Please Enter Valid OTP.');
      return false;
    }
    callOtpVerificationApi();
  };

  // API Calling - Otp Verification
  const callOtpVerificationApi = () => {
    toggleLoader(true);

    let params = {
      user_id: userId,
      device_name: deviceName,
      platform: Platform.OS,
      device_id: deviceId,
      push_token: '0',
      app_version: appVersion,
      os_version: osVersion,
      time_zone: '0',
      otp: otp,
    };

    APIManager.callPostApi(Method.OTP_VERIFICATION, params, props, response => {
      toggleLoader(false);
      showSuccess(response.message, '');
      APISessionManger.setUserLogin(true);
      APISessionManger.setUserData(response.data);
      APISessionManger.setUserToken(response.data?.access_token);
      if (response.data.role_id == UserType.TRUCK) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomTabTruck'}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomTab'}],
          }),
        );
      }
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{name: 'BottomTab'}],
      //   }),
      // );
    });
  };

  // API Calling - Resend Otp
  const callResendOtp = () => {
    toggleLoader(true);

    let params = {
      email: email,
    };

    APIManager.callPostApi(Method.LOGIN, params, props, response => {
      toggleLoader(false);
      showSuccess(response.message);
      setSeconds(10);
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={Images.imgLogo}
        />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.headerBlueTxt}>{'OTP Verification'}</Text>
        <Text style={styles.headerSubTitle}>
          {`Please enter the 6 digit verification code we sent to your E-mail`}
        </Text>
        <Text style={styles.numberTxt}>{`${email}`}</Text>

        <View style={styles.otpContainer}>
          <OtpInput onChange={setOtp} />
        </View>

        <ThemeButton
          title={`Continue`}
          style={styles.continueButton}
          styleText={{
            color: Colors.White,
            fontFamily: Fonts.DM_Bold,
          }}
          action={validation}
          disabled={false}
        />

        <View style={styles.bottomTxtContainer}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Text style={styles.alredyTxt}>{`Didn’t receive OTP?  `}</Text>
            <TouchableOpacity
              disabled={seconds != 0 ? true : false}
              onPress={() => {
                callResendOtp();
              }}>
              <Text
                style={styles.signinTxt}>{`Resend in ${seconds} second`}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("SignupScreen");
            }}>
            <Text style={styles.neetHelpTxt}>{'Need Help?'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default VerifyOTPScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(5),
  },
  logoImage: {
    width: '50%',
  },
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(26),
  },
  headerBlueTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(26),
    textAlign: 'center',
    marginTop: responsiveHeight(5),
  },
  headerSubTitle: {
    color: Colors.LightGrey,
    fontFamily: Fonts.Regular,
    fontSize: normalize(15),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  numberTxt: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(14),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  innerContainer: {
    backgroundColor: Colors.White,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(3),
  },
  otpContainer: {
    marginTop: 50,
  },
  label: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(14),
  },
  continueButton: {
    // backgroundColor: Colors.White,
    marginTop: responsiveHeight(2),
  },
  bottomTxtContainer: {
    alignItems: 'center',
    // flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(5),
    // flex: 1,
  },
  alredyTxt: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(14),
    textAlign: 'center',
  },
  signinTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(15),
    // textDecorationLine: 'underline',
    // textDecorationStyle: 'solid',
  },
  neetHelpTxt: {
    color: Colors.PrimarySecond,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(15),
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    marginTop: responsiveHeight(2),
  },
});
