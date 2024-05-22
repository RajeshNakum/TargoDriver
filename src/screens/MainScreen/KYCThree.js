import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {ThemeButton} from '../../components/Button/themeButton';
import Pagination from '../../components/Other/Pagination';
import Icon from '../../components/Other/Icon';
import OtpInput from '../../components/Input/OtpInput';
import {showError, showSuccess, toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';

function KYCThree(props) {
  const navigation = useNavigation();

  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(10);
  const [documentType, setDocumentType] = useState('A');

  // UseEffect - set upload document type
  useEffect(() => {
    setDocumentType(props.route.params.documentType);
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

  // API Calling - Resend Otp
  const callResendOtp = () => {
    // toggleLoader(true);

    let params = {
      verification_otp: otp,
      document_type:
        documentType == 'A'
          ? 'aadhar_card'
          : documentType == 'P'
          ? 'pan_card'
          : 'license',
    };

    // APIManager.callPostApi(
    //   Method.KYC_OTP_VERIFICATION,
    //   params,
    //   props,
    //   response => {
    //     toggleLoader(false);
    //     showSuccess(response.message);
    //     setSeconds(10);
    //   },
    // );
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

  const callOtpVerificationApi = () => {
    toggleLoader(true);

    let params = {
      verification_otp: otp,
      document_type:
        documentType == 'A'
          ? 'aadhar_card'
          : documentType == 'P'
          ? 'pan_card'
          : 'license',
    };
    console.log('send paam  === > ', params);

    APIManager.callPostApi(
      Method.KYC_OTP_VERIFICATION,
      params,
      props,
      response => {
        toggleLoader(false);
        showSuccess(response.message);
        setSeconds(10);
        console.log('API - KYC OTP VERIFICATION ->  res   ====> ', response);
        navigation.navigate('KYCFour', {documentType: documentType});
      },
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.PrimaryFirst}
          />
        </TouchableOpacity>
        <Pagination
          index={3}
          totalCount={[1, 2, 3, 4, 5]}
          ContainerStyle={{marginVertical: responsiveHeight(1)}}
          isCountHide={false}
        />
        <Text style={styles.headerTxt}>{'OTP Verification'}</Text>
        <Text
          style={
            styles.headerSubTitle
          }>{`Enter the OTP sent to the mobile number linked to your Aadhaar`}</Text>
      </View>
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          bounces={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={styles.otpContainer}>
            <OtpInput onChange={setOtp} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              justifyContent: 'center',
            }}>
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
        </ScrollView>
      </View>
      <View style={styles.bottomTxtContainer}>
        <ThemeButton
          title={`Continue`}
          style={styles.continueButton}
          styleText={{
            color: Colors.White,
            fontFamily: Fonts.DM_Bold,
          }}
          action={() => {
            validation();
          }}
          disabled={false}
        />
      </View>
    </View>
  );
}
export default KYCThree;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(15),
  },
  logoImage: {
    width: '50%',
  },
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(26),
    textAlign: 'center',
  },
  headerSubTitle: {
    color: Colors.White,
    fontFamily: Fonts.Regular,
    fontSize: normalize(15),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  headerBlueTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(26),
    textAlign: 'center',
    marginTop: responsiveHeight(5),
  },
  subTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Medium,
    fontSize: normalize(12),
    // textAlign: 'center',
    marginTop: responsiveHeight(3),
  },
  label: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(14),
    marginTop: responsiveHeight(2),
  },
  innerContainer: {
    backgroundColor: Colors.White,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(3),
  },
  otpContainer: {
    marginTop: 50,
  },
  continueButton: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
  bottomTxtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(3),
    paddingBottom: responsiveHeight(2),
    position: 'absolute',
    bottom: 0,
    elevation: 10,
    backgroundColor: Colors.White,
  },
  backArrow: {
    marginVertical: responsiveHeight(2),
    height: 40,
    width: 40,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
  },
});
