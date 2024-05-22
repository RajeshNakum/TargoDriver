import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {ThemeButton} from '../../components/Button/themeButton';
import Pagination from '../../components/Other/Pagination';
import Icon from '../../components/Other/Icon';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';
import {showError, showSuccess, toggleLoader} from '../../config/functions';

function KYCFour(props) {
  const navigation = useNavigation();

  const [selectedImagedata, setSelectedImageData] = useState(null);
  const [documentType, setDocumentType] = useState('A');

  // UseEffect - set upload document type
  useEffect(() => {
    setDocumentType(props.route.params.documentType);
  }, []);

  const captureImage = () => {
    var options = {
      selectionLimit: 1,
      mediaType: 'photo',
      quality: 1,
    };

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );

          // console.log("granted ==> ", granted)
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted

            launchCamera(options, res => {
              console.log('Response = ', res);
              if (res.didCancel) {
                console.log('User cancelled image picker');
              } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
              } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
              } else {
                // handleCloseModal()
                // props.getImage(res.assets[0].uri, res.assets[0].base64)
                setSelectedImageData(res.assets[0]);
              }
            });
          } else {
            showError('CAMERA permission denied');

            Alert.alert(
              'Permission Required',
              "The application requires access to your camera. Since you've previously opted out, you can now grant permission via the settings. Would you like to adjust your settings now?",
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    // setTimeout(() => {
                    Linking.openSettings();
                    // }, 1500);
                  },
                },
              ],
            );
          }
        } catch (err) {
          showError('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    }
  };

  const callUploadUserImage = () => {
    toggleLoader(true);
    let params;
    if (documentType == 'A') {
      params = {
        document_type: 'aadhar_card',
        aadhar_user_image: {
          uri: selectedImagedata.uri,
          type: selectedImagedata.type,
          name: selectedImagedata.fileName,
        },
        isFormData: true,
      };
    } else if (documentType == 'P') {
      params = {
        document_type: 'pan_card',
        pan_user_image: {
          uri: selectedImagedata.uri,
          type: selectedImagedata.type,
          name: selectedImagedata.fileName,
        },
        isFormData: true,
      };
    } else {
      params = {
        document_type: 'license',
        license_user_image: {
          uri: selectedImagedata.uri,
          type: selectedImagedata.type,
          name: selectedImagedata.fileName,
        },
        isFormData: true,
      };
    }

    console.log('check send params  ==== >   , ', params);

    APIManager.callPostApi(
      Method.KYC_UPLOAD_USER_IMAGE,
      params,
      props,
      response => {
        toggleLoader(false);
        showSuccess(response.message);
        console.log('API - KYC TAKE USER PHOTO ->  res   ====> ', response);
        navigation.navigate('KYCFive', {documentType: documentType});
        console.log('check response of upload documents');
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
          index={4}
          totalCount={[1, 2, 3, 4, 5]}
          ContainerStyle={{marginVertical: responsiveHeight(1)}}
          isCountHide={false}
        />
        {selectedImagedata ? (
          <>
            <Text style={styles.headerTxt}>{'Perfect!'}</Text>
            <Text
              style={
                styles.headerSubTitle
              }>{`Click on ‘SUBMIT’ to proceed for final verification`}</Text>
          </>
        ) : (
          <>
            <Text style={styles.headerTxt}>{'Click Your Photo'}</Text>
            <Text
              style={
                styles.headerSubTitle
              }>{`Take a picture to verify your identity. Follow the below guidelines for proper verification`}</Text>
          </>
        )}
      </View>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.scrollView}
        bounces={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        {selectedImagedata ? (
          <Image
            source={{uri: selectedImagedata.uri}}
            resizeMode="contain"
            style={{
              width: responsiveWidth(25),
              height: responsiveHeight(15),
              marginTop: responsiveHeight(2),
            }}
          />
        ) : (
          <Image
            source={Images.imgTakePhoto}
            resizeMode="contain"
            style={{
              width: responsiveWidth(25),
              height: responsiveHeight(15),
              marginTop: responsiveHeight(2),
            }}
          />
        )}
        <View style={{flexDirection: 'row', marginTop: responsiveHeight(1.5)}}>
          <Icon
            type={'Ionicons'}
            name={
              selectedImagedata
                ? 'checkmark-circle-sharp'
                : 'checkmark-circle-outline'
            }
            size={25}
            color={selectedImagedata ? Colors.Green : Colors.PrimaryFirst}
          />
          <Text style={styles.discriptionTxt}>
            {'Look straight into the camera'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: responsiveHeight(1.5)}}>
          <Icon
            type={'Ionicons'}
            name={
              selectedImagedata
                ? 'checkmark-circle-sharp'
                : 'checkmark-circle-outline'
            }
            size={25}
            color={selectedImagedata ? Colors.Green : Colors.PrimaryFirst}
          />
          <Text style={styles.discriptionTxt}>
            {'Make sure you have good lighting in your photo'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: responsiveHeight(1.5)}}>
          <Icon
            type={'Ionicons'}
            name={
              selectedImagedata
                ? 'checkmark-circle-sharp'
                : 'checkmark-circle-outline'
            }
            size={25}
            color={selectedImagedata ? Colors.Green : Colors.PrimaryFirst}
          />
          <Text style={styles.discriptionTxt}>
            {'Take photo with a light-colored background, preferrably white'}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomTxtContainer}>
        {selectedImagedata ? (
          <>
            <ThemeButton
              title={`Re-Take Photo`}
              style={[styles.retakeButton, {width: '49%'}]}
              styleText={{
                color: Colors.PrimaryFirst,
                fontFamily: Fonts.DM_Bold,
              }}
              action={() => {
                captureImage();
              }}
              disabled={false}
            />
            <ThemeButton
              title={`Submit`}
              style={[styles.continueButton, {width: '49%'}]}
              styleText={{
                color: Colors.White,
                fontFamily: Fonts.DM_Bold,
              }}
              action={() => {
                callUploadUserImage();
              }}
              disabled={false}
            />
          </>
        ) : (
          <ThemeButton
            title={`Take Photo`}
            style={styles.continueButton}
            styleText={{
              color: Colors.White,
              fontFamily: Fonts.DM_Bold,
            }}
            action={() => {
              captureImage();
            }}
            disabled={false}
          />
        )}
      </View>
    </View>
  );
}
export default KYCFour;

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
    alignItems: 'center',
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
  continueButton: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
  retakeButton: {
    marginTop: responsiveHeight(2),
    borderColor: Colors.PrimaryFirst,
    backgroundColor: Colors.White,
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
  discriptionTxt: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(14),
    marginLeft: responsiveWidth(3),
    flex: 1,
  },
});
