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
import {
  keyboards,
  responsiveHeight,
  responsiveWidth,
} from '../../common/GConstants';
import {ThemeButton} from '../../components/Button/themeButton';
import Pagination from '../../components/Other/Pagination';
import Icon from '../../components/Other/Icon';
import CustomPhoneInput from '../../components/Input/CustomPhoneInput';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import {isMobile, notEmptyString} from '../../utils/validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import APIManager from '../../Api/APIManager';
import {showError, showSuccess, toggleLoader} from '../../config/functions';
import {Method} from '../../Api/APIConstant';

function KYCTwo(props) {
  const navigation = useNavigation();

  const [selectedImagedata, setSelectedImageData] = useState(null);
  const [documentType, setDocumentType] = useState('A');

  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState(false);

  const [aadhaarNumber, setAadhaarNumbebr] = useState('');
  const [aadhaarNumberError, setAadhaarNumberError] = useState(false);

  const [phoneError, setPhoneError] = useState('');
  const [phoneData, setPhoneData] = useState({
    countryCode: 'IN',
    callingCode: '+91',
  });

  // UseEffect - set upload document type
  useEffect(() => {
    setDocumentType(props.route.params.documentType);
  }, []);

  // Function  - select document for upload
  const selectFile = () => {
    var options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setSelectedImageData(res.assets[0]);
      }
    });
  };

  // Validation - Check validation for Upload kyc document (Full Name , Documnet Number , PhoneNumber)
  const Verification = () => {
    if (fullName == '') {
      setFullNameError('Please Enter Full Name.');
      return false;
    }

    if (aadhaarNumber == '') {
      setAadhaarNumberError(
        `Please Enter Your ${
          documentType == 'A'
            ? 'Aadhaar Number'
            : documentType == 'P'
            ? 'Pancard Number'
            : 'License Number'
        }.`,
      );
      return false;
    }

    if (documentType == 'A' && aadhaarNumber.length != 12) {
      setAadhaarNumberError('Please Enter Valid Aadhaar Number.');
      return false;
    } else if (documentType == 'P' && aadhaarNumber.length != 10) {
      setAadhaarNumberError('Please Enter Valid Pancard Number.');
      return false;
    } else if (documentType == 'L' && aadhaarNumber.length != 14) {
      setAadhaarNumberError('Please Enter Valid License Number.');
      return false;
    } else {
    }

    if (!isMobile(phoneData.callingCode + phoneData.phoneNumber)) {
      setPhoneError('Please Enter Valid Phone Number.');
      return false;
    }

    if (
      phoneData &&
      phoneData.phoneNumber &&
      phoneData.phoneNumber.length != 10
    ) {
      setPhoneError('Please Enter Valid Phone Number.');
      return false;
    }

    if (selectedImagedata == null) {
      showError('Please Select Document.');
      return false;
    }
    // navigation.navigate('KYCThree', {documentType: documentType});
    callUploadDocumentApi();
  };

  // Function - Upload kyc document and details.
  const callUploadDocumentApi = () => {
    toggleLoader(true);
    let params;
    if (documentType == 'A') {
      params = {
        document_type: 'aadhar_card',
        aadhar_name: fullName,
        aadhar_number: aadhaarNumber,
        aadhar_linked_mobile_number: phoneData.phoneNumber,
        aadhar_image: {
          uri: selectedImagedata.uri,
          type: selectedImagedata.type,
          name: selectedImagedata.fileName,
        },
        isFormData: true,
      };
    } else if (documentType == 'P') {
      params = {
        document_type: 'pan_card',
        pan_name: fullName,
        pan_number: aadhaarNumber,
        pan_linked_mobile_number: phoneData.phoneNumber,
        pan_image: {
          uri: selectedImagedata.uri,
          type: selectedImagedata.type,
          name: selectedImagedata.fileName,
        },
        isFormData: true,
      };
    } else {
      params = {
        document_type: 'license',
        license_name: fullName,
        license_number: aadhaarNumber,
        license_linked_mobile_number: phoneData.phoneNumber,
        license_image: {
          uri: selectedImagedata.uri,
          type: selectedImagedata.type,
          name: selectedImagedata.fileName,
        },
        isFormData: true,
      };
    }

    APIManager.callPostApi(
      Method.KYC_UPLOAD_DOCUMENT,
      params,
      props,
      response => {
        toggleLoader(false);
        showSuccess(response.message);
        console.log('API - KYC UPLOAD DOCUMENT ->  res   ====> ', response);
        navigation.navigate('KYCThree', {documentType: documentType});
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
          index={2}
          totalCount={[1, 2, 3, 4, 5]}
          ContainerStyle={{marginVertical: responsiveHeight(1)}}
          isCountHide={false}
        />
        <Text style={styles.headerTxt}>{`${
          documentType == 'A'
            ? 'Aadhaar'
            : documentType == 'P'
            ? 'Pancard'
            : 'License'
        } Details`}</Text>
        <Text
          style={
            styles.headerSubTitle
          }>{`Please enter all the below details as per your ${
          documentType == 'A'
            ? 'Aadhaar'
            : documentType == 'P'
            ? 'Pancard'
            : 'License'
        } Card`}</Text>
      </View>
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="always">
          <Text style={styles.label}>{`Name as per ${
            documentType == 'A'
              ? 'Aadhaar Card'
              : documentType == 'P'
              ? 'Pan Card'
              : 'Driver’s License'
          }`}</Text>
          <InputLeftLabel
            autoCapitalize="none"
            error={fullNameError}
            placeholder={'Full Name'}
            // textContentType="emailAddress"
            value={fullName}
            onChangeText={value => {
              setFullName(value);
              setFullNameError(null);
            }}
            fieldValidationRule={notEmptyString}
            containerStyle={{marginTop: responsiveHeight(1)}}
          />
          <Text style={styles.label}>{`${
            documentType == 'A'
              ? 'Aadhaar Card'
              : documentType == 'P'
              ? 'Pan Card'
              : 'Driver’s License'
          } Number`}</Text>
          <InputLeftLabel
            autoCapitalize="none"
            error={aadhaarNumberError}
            placeholder={`${
              documentType == 'A'
                ? 'Aadhaar Card'
                : documentType == 'P'
                ? 'Pan Card'
                : 'Driver’s License'
            }  Number`}
            value={aadhaarNumber}
            onChangeText={value => {
              setAadhaarNumbebr(value);
              setAadhaarNumberError(null);
            }}
            maxLength={documentType == 'A' ? 12 : documentType == 'P' ? 10 : 14}
            keyboardType={keyboards.numeric}
            fieldValidationRule={notEmptyString}
            containerStyle={{marginTop: responsiveHeight(1)}}
          />
          <Text style={styles.label}>{`Phone Number linked to ${
            documentType == 'A'
              ? 'Aadhaar Card'
              : documentType == 'P'
              ? 'Pan Card'
              : 'Driver’s License'
          }`}</Text>
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
              marginTop: responsiveHeight(1),
            }}
          />

          <TouchableOpacity
            style={styles.uploadImageContainer}
            onPress={() => selectFile()}>
            {selectedImagedata ? (
              <View style={styles.imageInnerContainer}>
                <View style={styles.uploadButton}>
                  <Image
                    resizeMode="Cover"
                    style={{
                      width: responsiveHeight(9),
                      height: responsiveHeight(9),
                    }}
                    source={{uri: selectedImagedata.uri}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginLeft: responsiveWidth(3),
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Text style={styles.uploadLabel}>
                    {selectedImagedata.fileName}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedImageData(null)}>
                    <Icon
                      type={'FontAwesome5'}
                      name={'trash-alt'}
                      size={25}
                      color={Colors.Red}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.imageInnerContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.uploadLabel}>
                    {`Upload ${
                      documentType == 'A'
                        ? 'Aadhaar Card'
                        : documentType == 'P'
                        ? 'Pan Card'
                        : 'Driver’s License'
                    }`}
                  </Text>
                  <Text style={styles.uploadSublabel}>
                    {'(png, jpg, jpeg formats only)'}
                  </Text>
                </View>
                <View style={styles.uploadButton}>
                  <Icon
                    type={'Feather'}
                    name={'upload'}
                    size={25}
                    color={Colors.White}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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
            Verification();
          }}
          disabled={false}
        />
      </View>
    </View>
  );
}
export default KYCTwo;

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
  scrollView: {
    flexGrow: 1,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(15),
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
  serviceText: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(16),
    textTransform: 'uppercase',
    // textAlign: 'center',
  },
  serviceSubText: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(14),
    marginTop: responsiveHeight(1),
  },
  serviceContainer: {
    backgroundColor: Colors.White,
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(2),
    borderColor: Colors.PrimaryFirst,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: responsiveHeight(2),
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
  uploadImageContainer: {
    borderColor: Colors.LightGrey1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 10,
    height: responsiveHeight(15),
    marginTop: responsiveHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageInnerContainer: {
    height: '100%',
    width: '100%',
    padding: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadLabel: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(16),
  },
  uploadSublabel: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(14),
  },
  uploadButton: {
    backgroundColor: Colors.PrimaryFirst,
    width: responsiveHeight(9),
    height: responsiveHeight(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
