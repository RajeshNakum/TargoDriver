import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import CustomPhoneInput from '../../components/Input/CustomPhoneInput';
import {ThemeButton} from '../../components/Button/themeButton';
import {isMobile, notEmptyString} from '../../utils/validation';
import {useNavigation} from '@react-navigation/native';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import APIManager from '../../Api/APIManager';
import {Method, UserType} from '../../Api/APIConstant';
import {showSuccess, toggleLoader} from '../../config/functions';

function SignupScreen(props) {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [phoneError, setPhoneError] = useState('');
  const [phoneData, setPhoneData] = useState({
    countryCode: 'IN',
    callingCode: '+91',
  });
  const [userType, setUserType] = useState('');

  useEffect(() => {
    if (props.route.params.documentType == 'D') {
      setUserType(UserType.DRIVER);
    } else {
      setUserType(UserType.TRUCK);
    }
  }, []);

  // Validation - Check validation for signup user (Full Name , Email , PhoneNumber)
  const varification = () => {
    if (fullName == '') {
      setFullNameError('Please Enter Full Name.');
      return false;
    }

    if (email == '') {
      setEmailError('Please Enter Your Email.');
      return false;
    }

    if (!isMobile(phoneData.callingCode + phoneData.phoneNumber)) {
      setPhoneError('Please Enter Valid Phone Number.');
      return false;
    }
    callSignupApi();
  };

  // API Calling - Signup api
  const callSignupApi = () => {
    toggleLoader(true);

    let params = {
      name: fullName,
      email: email,
      role_id:
        props.route.params?.signupType == 'T'
          ? UserType.TRUCK
          : UserType.DRIVER, // role_id : 2  = use for customer
      mobile: phoneData.phoneNumber,
    };

    // console.log('send params  ====>   ,', params);

    APIManager.callPostApi(Method.REGISTER, params, props, response => {
      toggleLoader(false);
      showSuccess(response.message, '');
      navigation.navigate('VerifyOTPScreen', {
        email: email,
        userId: response.data?.id,
      });
    });
  };

  // Render Component
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
        <Text style={styles.headerBlueTxt}>{'Create Account'}</Text>
        <Text style={styles.headerSubTitle}>{`Set up your information.`}</Text>
        <Text style={styles.label}>{'Full Name'}</Text>
        <InputLeftLabel
          autoCapitalize="none"
          error={fullNameError}
          placeholder={'Enter your Full Name'}
          // textContentType="emailAddress"
          value={fullName}
          onChangeText={value => {
            setFullName(value);
            setFullNameError(null);
          }}
          fieldValidationRule={notEmptyString}
        />
        <Text style={styles.label}>{'E-Mail'}</Text>
        <InputLeftLabel
          autoCapitalize="none"
          error={emailError}
          placeholder={'Enter your email'}
          textContentType="emailAddress"
          value={email}
          onChangeText={value => {
            setEmail(value);
            setEmailError(null);
          }}
          keyboardType="email-address"
          autoCompleteType="email"
          fieldValidationRule={notEmptyString}
        />
        <Text style={styles.label}>{'Phone Number'}</Text>
        <CustomPhoneInput
          data={phoneData}
          error={phoneError}
          placeholder={'Mobile Number'}
          setField={(name, value) => {
            setPhoneError('');
            setPhoneData(current => ({...current, [name]: value}));
          }}
          borderContainerStyle={{
            borderColor: phoneError ? Colors.Red : Colors.PrimaryFirst,
            borderWidth: 2,
            marginTop: responsiveHeight(2),
          }}
        />
        <ThemeButton
          title={`Continue`}
          style={styles.continueButton}
          styleText={{
            color: Colors.White,
            fontFamily: Fonts.DM_Bold,
          }}
          action={varification}
          disabled={false}
        />

        <View style={styles.bottomTxtContainer}>
          <Text style={styles.alredyTxt}>{`Already have an account? `}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Text style={styles.signinTxt}>{'Sign In'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default SignupScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
  },
  logoImage: {
    width: '50%',
  },
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(26),
    // textAlign: 'center',
  },
  headerSubTitle: {
    color: Colors.LightGrey,
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
  continueButton: {
    // backgroundColor: Colors.White,
    marginTop: responsiveHeight(2),
  },
  bottomTxtContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(5),
    flex: 1,
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
    fontSize: normalize(14),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
