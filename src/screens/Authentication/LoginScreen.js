import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
// import CustomPhoneInput from '../../components/Input/CustomPhoneInput'; // Use for mobile inputbox
import {ThemeButton} from '../../components/Button/themeButton';
import {isMobile, notEmptyString} from '../../utils/validation';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import {showSuccess, toggleLoader} from '../../config/functions';

function LoginScreen(props) {
  const navigation = useNavigation();

  const [phoneError, setPhoneError] = useState('');
  const [phoneData, setPhoneData] = useState({
    countryCode: 'IN',
    callingCode: '+91',
  });

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  // Validation - Check validation for login (Email)
  const checkValidation = () => {
    // if (!isMobile(phoneData.callingCode + phoneData.phoneNumber)) {
    //   setPhoneError('Please Enter Valid Phone Number.');
    //   return false;
    // }

    if (email == '') {
      setEmailError('Please Enter Your Email.');
      return false;
    }

    callLoginApi();
    // navigation.navigate('VerifyOTPScreen', {phoneNumber: phoneData});
  };

  // API Calling - Login api
  const callLoginApi = () => {
    toggleLoader(true);

    let params = {
      email: email,
    };

    APIManager.callPostApi(Method.LOGIN, params, props, response => {
      toggleLoader(false);
      showSuccess(response.message)
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
        {/* <Text style={styles.headerTxt}>
          {`Hii, Welcome Back \nYou have been missed.`}
        </Text> */}
      </View>
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          bounces={false}
          keyboardShouldPersistTaps="always">
          <Text style={styles.headerBlueTxt}>{'Glad to see you again!'}</Text>
          <Text style={styles.headerSubTitle}>{`Log in to explore more`}</Text>

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

          {/* Mobile Text Input - change design  */}
          {/* <Text style={styles.label}>{'Phone Number'}</Text>
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
          /> */}

          <ThemeButton
            title={`Verify Email`}
            style={styles.continueButton}
            styleText={{
              color: Colors.White,
              fontFamily: Fonts.DM_Bold,
            }}
            action={checkValidation}
            disabled={false}
          />

          <View style={styles.bottomTxtContainer}>
            <Text style={styles.alredyTxt}>{`Don't have an account?  `}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectService');
              }}>
              <Text style={styles.signinTxt}>{'Sign Up'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  scrollView: {
    flexGrow: 1,
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
  innerContainer: {
    backgroundColor: Colors.White,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(3),
  },
  label: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(14),
    marginTop: responsiveHeight(2),
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
