import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {ThemeButton} from '../../components/Button/themeButton';
import Pagination from '../../components/Other/Pagination';
import Icon from '../../components/Other/Icon';
import APIManager from '../../Api/APIManager';
import {IMAGE_URL, Method} from '../../Api/APIConstant';
import {toggleLoader} from '../../config/functions';
import APISessionManger from '../../Api/APISessionManger';

function KYCFive(props) {
  const navigation = useNavigation();

  const [isSuccessfullModal, setIsSuccessfullModal] = useState(false);
  const [kycDetails, setKycDetails] = useState({});

  const [documentList, setDocumentList] = useState([]);

  // UseEffect - Call Api for gert user documents
  useEffect(() => {
    callApiGetKycDocument();
  }, []);

  const callApiGetKycDocument = () => {
    toggleLoader(true);
    let params = {};
    APIManager.callGetApi(Method.KYC_GET_DOCUMENT, params, props, response => {
      toggleLoader(false);
      let kycDetails = response?.data;
      setKycDetails(kycDetails);

      let listOfDocument = [];
      //

      if (kycDetails.aadhar_number != '' && kycDetails.aadhar_number != null) {
        listOfDocument.push({
          name: kycDetails.aadhar_name,
          documentNumber: kycDetails.aadhar_number,
          mobileNUmber: kycDetails.aadhar_linked_mobile_number,
          userImage: `${IMAGE_URL}${kycDetails.aadhar_user_image}`,
          documentImg: `${IMAGE_URL}${kycDetails.aadhar_image}`,
        });
      }
      if (kycDetails.pan_number != '' && kycDetails.pan_number != null) {
        listOfDocument.push({
          name: kycDetails.pan_name,
          documentNumber: kycDetails.pan_number,
          mobileNUmber: kycDetails.pan_linked_mobile_number,
          userImage: `${IMAGE_URL}${kycDetails.pan_user_image}`,
          documentImg: `${IMAGE_URL}${kycDetails.pan_image}`,
        });
      }
      if (
        kycDetails.license_number != '' &&
        kycDetails.license_number != null
      ) {
        listOfDocument.push({
          name: kycDetails.license_name,
          documentNumber: kycDetails.license_number,
          mobileNUmber: kycDetails.license_linked_mobile_number,
          userImage: `${IMAGE_URL}${kycDetails.license_user_image}`,
          documentImg: `${IMAGE_URL}${kycDetails.license_image}`,
        });
      }

      setDocumentList(listOfDocument);
    });
  };

  const completeKyc = () => {
    APISessionManger.setIsUserKYC(true);
    setIsSuccessfullModal(true);
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
          index={5}
          totalCount={[1, 2, 3, 4, 5]}
          ContainerStyle={{marginVertical: responsiveHeight(1)}}
          isCountHide={false}
        />
        <Text style={styles.headerTxt}>{'You’re Almost Done'}</Text>
        <Text
          style={
            styles.headerSubTitle
          }>{`Read all your details and click on ‘Submit’ to submit your details`}</Text>
      </View>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.scrollView}
        bounces={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        {documentList.map(documentItem => (
          <>
            <View style={styles.whiteContainer}>
              <View>
                <View
                  style={{
                    backgroundColor: Colors.PrimaryFirst,
                    width: responsiveWidth(30),
                    height: responsiveWidth(30),
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{uri: documentItem.userImage}}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                {/* <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.retaketxt}>{'Re-Take Photo'}</Text>
            </TouchableOpacity> */}
              </View>
              <View style={styles.detailsTxt}>
                <Text style={styles.labelTxt}>{'Full Name'}</Text>
                <Text style={styles.valueTxt}>{documentItem.name}</Text>
                <Text style={styles.labelTxt}>{'Aadhaar Number: '}</Text>
                <Text
                  style={
                    styles.valueTxt
                  }>{`**** **** **** ${documentItem.documentNumber.substring(
                  documentItem.documentNumber.length - 4,
                  documentItem.documentNumber.length,
                )}`}</Text>
                <Text style={styles.labelTxt}>{'Phone Number:'}</Text>
                <Text style={styles.valueTxt}>{documentItem.mobileNUmber}</Text>
              </View>
            </View>
            <View style={[styles.whiteContainer, {flexDirection: 'column'}]}>
              {/* <View
                style={{
                  backgroundColor: Colors.PrimaryFirst,
                  width: responsiveWidth(15),
                  height: responsiveWidth(15),
                  borderRadius: 10,
                }}></View> */}
              <Image
                source={{uri: documentItem.documentImg}}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: responsiveHeight(20),
                  marginBottom: responsiveHeight(2),
                }}
              />
              <View style={styles.detailsTxt}>
                <Text style={styles.imageTxt}>{'img19082022.png'}</Text>
              </View>
            </View>
          </>
        ))}
      </ScrollView>
      <View style={styles.bottomTxtContainer}>
        <ThemeButton
          title={`Submit`}
          style={styles.continueButton}
          styleText={{
            color: Colors.White,
            fontFamily: Fonts.DM_Bold,
          }}
          action={() => {
            completeKyc();
          }}
          disabled={false}
        />
      </View>

      <Modal
        visible={isSuccessfullModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSuccessfullModal(false)}>
        <Pressable
          style={styles.modalContainer}
          onPress={(event: any) => {
            if (event.target == event.currentTarget) {
              // setIsSuccessfullModal(false);
            }
          }}>
          <View
            style={[
              styles.modalContent,
              {width: responsiveWidth(80), alignItems: 'center'},
            ]}>
            <Icon
              type={'Ionicons'}
              name={'checkmark-circle-sharp'}
              size={100}
              color={Colors.Green}
            />
            {documentList.length > 0 && (
              <Text
                style={[
                  styles.modalHeader,
                  {marginTop: responsiveHeight(2)},
                ]}>{`Congratulations ${documentList[0].name}!`}</Text>
            )}
            <Text style={[styles.modalHeader]}>{`KYC Completed!`}</Text>
            <ThemeButton
              title={`Continue`}
              style={styles.continueButton}
              styleText={{
                color: Colors.White,
                fontFamily: Fonts.DM_SemiBold,
              }}
              action={() => {
                setIsSuccessfullModal(false);
                navigation.navigate('BottomTab');
              }}
              disabled={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
export default KYCFive;

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
  label: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(14),
    marginTop: responsiveHeight(2),
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(15),
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
  whiteContainer: {
    backgroundColor: Colors.White,
    elevation: 10,
    borderRadius: 10,
    padding: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
  },
  retaketxt: {
    color: Colors.PrimarySecond,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(15),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  labelTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(16),
    marginTop: responsiveHeight(1),
  },
  valueTxt: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(15),
    marginTop: 5,
  },
  imageTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(16),
  },
  detailsTxt: {
    marginLeft: responsiveWidth(5),
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.modalBackground,
  },
  modalContent: {
    width: responsiveWidth(60),
    maxHeight: responsiveHeight(90),
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 0, height: 4},
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.7,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.SemiBold,
    fontSize: normalize(20),
    // textAlign: 'center',
    marginBottom: responsiveHeight(1),
  },
  modalSubText: {
    color: Colors.LightGrey,
    fontFamily: Fonts.Medium,
    fontSize: normalize(13),
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
  },
});
