import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import CustomPhoneInput from '../../components/Input/CustomPhoneInput';
import {ThemeButton} from '../../components/Button/themeButton';
import {isMobile, notEmptyString} from '../../utils/validation';
import {CommonActions, useNavigation} from '@react-navigation/native';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import Icon from '../../components/Other/Icon';
import {showSuccess, toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';
import APISessionManger from '../../Api/APISessionManger';

function EditProfile(props) {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('John Weak');
  const [fullNameError, setFullNameError] = useState(false);

  const [email, setEmail] = useState('johnweak@gmail.com');
  const [emailError, setEmailError] = useState(false);

  const [phoneError, setPhoneError] = useState('');
  const [phoneData, setPhoneData] = useState({
    countryCode: 'IN',
    callingCode: '+91',
    phoneNumber: '1234567890',
  });

  // UseEffect - Call Api of get user data
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    toggleLoader(true);

    let params = {};

    APIManager.callGetApi(Method.GET_USER, params, props, response => {
      toggleLoader(false);
      console.log('API - response - getUserData   ==> ', response);
      let tempUserData = response.data;
      setFullName(tempUserData.name);
      setEmail(tempUserData.email);
      setPhoneData({phoneNumber: tempUserData.mobile});
    });
  };

  const validation = () => {
    if (fullName == '') {
      setFullNameError('Please Enter Full Name.');
      return false;
    }

    if (email == '') {
      setEmailError('Please Enter Your Email.');
      return false;
    }

    if (!isMobile(phoneData.phoneNumber)) {
      setPhoneError('Please Enter Valid Phone Number.');
      return false;
    }

    callUpdateProfileApi();
  };

  // API Calling - Update Profile api
  const callUpdateProfileApi = () => {
    toggleLoader(true);

    let params = {
      name: fullName,
      email: email,
      is_profile: 1,
      mobile: phoneData.phoneNumber,
    };

    APIManager.callPostApi(Method.UPDATE_PROFILE, params, props, response => {
      console.log('check user update  ', response);
      toggleLoader(false);
      showSuccess(response.message);

      APISessionManger.setUserData(response.data);
      navigation.goBack();
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.White}
          />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{'Edit Profile'}</Text>
      </View>
      <View style={styles.innerContainer}>
        {/* <Text style={styles.headerBlueTxt}>{'Create Account'}</Text> */}
        <Text
          style={
            styles.headerSubTitle
          }>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore `}</Text>
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
          title={`Update`}
          style={styles.continueButton}
          styleText={{
            color: Colors.White,
            fontFamily: Fonts.DM_Bold,
          }}
          action={validation}
          disabled={false}
        />
      </View>
    </View>
  );
}
export default EditProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    // paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    height: 80,
    backgroundColor: Colors.PrimaryFirst,
  },
  logoImage: {
    width: '50%',
  },
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(18),
    marginLeft: responsiveWidth(5),
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
