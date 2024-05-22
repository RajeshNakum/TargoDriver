import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import Icon from '../../components/Other/Icon';
import {ThemeButton} from '../../components/Button/themeButton';
import {showSuccess, toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';

function MyTruck(props) {
  const navigation = useNavigation();

  const [isOpenKycModal, setIsOpenKycModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

  const [truckList, setTruckList] = useState([
    {
      id: 1,
      truckName: 'TATA AEC 1',
      truckNumber: 'GJ 00 AB 0101',
      image: Images.imgTruck1,
    },
    {
      id: 2,
      truckName: 'TATA AEC 2',
      truckNumber: 'GJ 00 AB 0202',
      image: Images.imgTruck1,
    },
    {
      id: 3,
      truckName: 'TATA AEC 3',
      truckNumber: 'GJ 00 AB 0303',
      image: Images.imgTruck1,
    },
  ]);

  const [driverList, setDriverList] = useState([
    {
      id: 1,
      driverName: 'Lokesh J',
      truck: 'GJ 00 AB 0101',
      image: Images.imgTruckOwner,
    },
    {
      id: 2,
      driverName: 'Anusha Sharma',
      truck: 'GJ 00 AB 0202',
      image: Images.imgTruckOwner,
    },
    {
      id: 3,
      driverName: 'Vignesh Shetty',
      truck: 'GJ 00 AB 0303',
      image: Images.imgTruckOwner,
    },
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
      getVehicleList();
    });

    return unsubscribe;
  }, []);

  const getUserData = () => {
    toggleLoader(true);

    let params = {};

    APIManager.callGetApi(Method.GET_USER, params, props, response => {
      toggleLoader(false);
      console.log('API - response - getUserData   ==> ', response);
      let tempUserData = response.data;
      if (tempUserData.is_kyc_completed == 0) {
        // setIsOpenKycModal(true);
      }
    });
  };

  const getVehicleList = () => {
    toggleLoader(true);

    let params = {};

    APIManager.callGetApi(
      `${Method.VEHICLE_LIST}?per_page=1000`,
      params,
      props,
      response => {
        toggleLoader(false);
        setTruckList(response?.data?.data);
      },
    );
  };

  const deleteVehicle = deleteVehicleId => {
    toggleLoader(true);

    APIManager.callDeleteApi(
      `${Method.VEHICLE}/${deleteVehicleId}`,
      {},
      props,
      response => {
        toggleLoader(false);
        console.log('API - response - delete Address   ==> ', response);
        showSuccess(response.message);
        let tmepVehicle = truckList.filter(item => item.id != deleteVehicleId);
        setTruckList(tmepVehicle);
      },
    );
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('TruckBooking')}
        style={{
          // backgroundColor: 'red',
          // padding: responsiveWidth(3),
          borderColor: Colors.PrimaryFirst,
          borderWidth: 2,
          borderRadius: 10,
          marginTop: responsiveHeight(2),
          overflow: 'hidden',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: Colors.White,
              width: 80,
              height: 80,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: item?.type_details?.image}}
              resizeMode="cover"
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 10,
                backgroundColor: Colors.lightGrey,
              }}
            />
          </View>
          <View style={{flex: 1, paddingVertical: 10}}>
            {item?.isVerified && (
              <View
                style={{
                  backgroundColor: Colors.PrimaryFirst,
                  position: 'absolute',
                  height: 20,
                  width: 80,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: 5,
                  top: 5,
                }}>
                <Text style={styles.verifyTxt}>{'VERIFIED'}</Text>
              </View>
            )}
            <Text style={styles.label}>{item.vehicle_name}</Text>
            <Text style={styles.truckNumber}>{item.vehicle_number}</Text>
            {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: responsiveWidth(2),
                backgroundColor: Colors.PrimaryFirst,
                borderRadius: 100,
                marginTop: 5,
                marginLeft: 5,
              }}>
              <Icon
                type={'FontAwesome5'}
                name={'truck'}
                size={12}
                color={Colors.White}
              />
              <Text style={styles.weightTxt}>{'Heavy Open Body'}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: responsiveWidth(2),
                backgroundColor: Colors.PrimaryFirst,
                borderRadius: 100,
                marginTop: 5,
                marginLeft: 5,
              }}>
              <Icon
                type={'FontAwesome5'}
                name={'weight-hanging'}
                size={12}
                color={Colors.White}
              />
              <Text style={styles.weightTxt}>{'Upto 32 Tonn'}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: responsiveWidth(2),
                backgroundColor: Colors.PrimaryFirst,
                borderRadius: 100,
                marginTop: 5,
                marginLeft: 5,
              }}>
              <Icon
                type={'FontAwesome5'}
                name={'weight-hanging'}
                size={12}
                color={Colors.White}
              />
              <Text style={styles.weightTxt}>{'7L x 4.8W x 4.8H (ft)'}</Text>
            </View>
          </View> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: responsiveHeight(1),
            paddingHorizontal: 5,
          }}>
          <ThemeButton
            title={`Delete`}
            style={{
              backgroundColor: Colors.White,
              borderColor: Colors.Red,
              borderWidth: 1,
              flex: 0.49,
              minHeight: 50,
            }}
            styleText={{
              color: Colors.Red,
              fontSize: normalize(16),
            }}
            action={() => {
              // navigation.navigate('TrackLoad');
              deleteVehicle(item.id);
            }}
            disabled={false}
            leftIcon={true}
            leftIconType={'Entypo'}
            leftIconName={'trash'}
            iconColor={Colors.Red}
          />
          <ThemeButton
            title={`Edit`}
            style={{flex: 0.49, minHeight: 50}}
            styleText={{
              color: Colors.White,
              fontSize: normalize(16),
            }}
            action={() => {
              navigation.navigate('AddTruck', {isEdit: true, editItem: item});
            }}
            disabled={false}
            leftIcon={true}
            leftIconType={'Entypo'}
            leftIconName={'edit'}
            iconColor={Colors.White}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const _renderDriver = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('TruckBooking')}
        style={{
          // backgroundColor: 'red',
          // padding: responsiveWidth(3),
          borderColor: Colors.PrimaryFirst,
          borderWidth: 2,
          borderRadius: 10,
          marginTop: responsiveHeight(2),
          overflow: 'hidden',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: Colors.White,
              width: 80,
              height: 80,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 10,
              }}
            />
          </View>
          <View style={{flex: 1, paddingVertical: 10}}>
            <View
              style={{
                backgroundColor: Colors.PrimaryFirst,
                position: 'absolute',
                height: 20,
                width: 80,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                right: 5,
                top: 5,
              }}>
              <Text style={styles.verifyTxt}>{'VERIFIED'}</Text>
            </View>
            <Text style={styles.label}>{item.driverName}</Text>
            <Text style={styles.truckNumber}>{item.truck}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: responsiveHeight(1),
            paddingHorizontal: 5,
          }}>
          <ThemeButton
            title={`Delete`}
            style={{
              backgroundColor: Colors.White,
              borderColor: Colors.Red,
              borderWidth: 1,
              flex: 0.49,
              minHeight: 50,
            }}
            styleText={{
              color: Colors.Red,
              fontSize: normalize(16),
            }}
            action={() => {
              // navigation.navigate('TrackLoad');
            }}
            disabled={false}
            leftIcon={true}
            leftIconType={'Entypo'}
            leftIconName={'trash'}
            iconColor={Colors.Red}
          />
          <ThemeButton
            title={`Edit`}
            style={{flex: 0.49, minHeight: 50}}
            styleText={{
              color: Colors.White,
              fontSize: normalize(16),
            }}
            action={() => {
              navigation.navigate('AddDrivers');
            }}
            disabled={false}
            leftIcon={true}
            leftIconType={'Entypo'}
            leftIconName={'edit'}
            iconColor={Colors.White}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.logoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{`My Truck`}</Text>
        </View>
        {/* {selectedTab == 1 ? (
          <ThemeButton
            title={`Add Truck`}
            style={{
              backgroundColor: Colors.White,
              minHeight: 50,
              borderRadius: 100,
            }}
            styleText={{
              color: Colors.PrimaryFirst,
              fontSize: normalize(14),
              fontFamily: Fonts.SemiBold,
            }}
            action={() => {
              navigation.navigate('AddTruck');
            }}
            disabled={false}
            leftIcon={true}
            leftIconType={'Entypo'}
            leftIconName={'plus'}
            iconColor={Colors.PrimaryFirst}
          />
        ) : (
          <ThemeButton
            title={`Add Drivers`}
            style={{
              backgroundColor: Colors.White,
              minHeight: 50,
              borderRadius: 100,
            }}
            styleText={{
              color: Colors.PrimaryFirst,
              fontSize: normalize(14),
              fontFamily: Fonts.SemiBold,
            }}
            action={() => {
              navigation.navigate('AddDrivers');
            }}
            disabled={false}
            leftIcon={true}
            leftIconType={'Entypo'}
            leftIconName={'plus'}
            iconColor={Colors.PrimaryFirst}
          />
        )} */}
      </View>

      <View style={styles.InnerContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setSelectedTab(1)}
            style={[
              styles.tabView,
              {
                backgroundColor:
                  selectedTab == 1 ? Colors.PrimaryFirst : Colors.White,
              },
            ]}>
            <Text
              style={[
                styles.tabTxt,
                {color: selectedTab == 1 ? Colors.White : Colors.PrimaryFirst},
              ]}>
              {'Trucks'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab(3)}
            style={[
              styles.tabView,
              {
                backgroundColor:
                  selectedTab == 3 ? Colors.PrimaryFirst : Colors.White,
              },
            ]}>
            <Text
              style={[
                styles.tabTxt,
                {color: selectedTab == 3 ? Colors.White : Colors.PrimaryFirst},
              ]}>
              {'Drivers'}
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab == 1 ? (
          <ThemeButton
            title={`Add Truck`}
            style={{
              backgroundColor: Colors.White,
              minHeight: 50,
              borderRadius: 100,
              marginHorizontal: responsiveWidth(5),
            }}
            styleText={{
              color: Colors.PrimaryFirst,
              fontSize: normalize(14),
              fontFamily: Fonts.SemiBold,
            }}
            action={() => {
              navigation.navigate('AddTruck', {isEdit: false});
            }}
            disabled={false}
            leftIcon={true}
            leftIconType={'Entypo'}
            leftIconName={'plus'}
            iconColor={Colors.PrimaryFirst}
          />
        ) : (
          <ThemeButton
            title={`Add Drivers`}
            style={{
              backgroundColor: Colors.White,
              minHeight: 50,
              borderRadius: 100,
              marginHorizontal: responsiveWidth(5),
            }}
            styleText={{
              color: Colors.PrimaryFirst,
              fontSize: normalize(14),
              fontFamily: Fonts.SemiBold,
            }}
            action={() => {
              navigation.navigate('AddDrivers');
            }}
            disabled={false}
            leftIcon={true}
            leftIconType={'Entypo'}
            leftIconName={'plus'}
            iconColor={Colors.PrimaryFirst}
          />
        )}
        {selectedTab == 1 ? (
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{
              paddingTop: responsiveHeight(2),
              paddingBottom: responsiveHeight(5),
              paddingHorizontal: responsiveWidth(3),
            }}
            showsVerticalScrollIndicator={false}
            data={truckList}
            renderItem={_renderItem}
            ItemSeparatorComponent={() => <View style={{}} />}
          />
        ) : (
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{
              paddingTop: responsiveHeight(2),
              paddingBottom: responsiveHeight(5),
              paddingHorizontal: responsiveWidth(3),
            }}
            showsVerticalScrollIndicator={false}
            data={driverList}
            renderItem={_renderDriver}
            ItemSeparatorComponent={() => <View style={{}} />}
          />
        )}
      </View>
      <Modal
        visible={isOpenKycModal}
        transparent={true}
        animationType="slide"
        // onRequestClose={() => setIsOpenKycModal(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={event => {
            if (event.target == event.currentTarget) {
              // setIsOpenKycModal(false);
            }
          }}>
          <View
            style={[
              styles.modalContent,
              {width: responsiveWidth(80), alignItems: 'center'},
            ]}>
            <Image
              source={Images.imgKyc}
              resizeMode="contain"
              style={{width: responsiveWidth(25), height: responsiveHeight(15)}}
            />
            <Text
              style={[
                styles.modalHeader,
                {marginTop: responsiveHeight(2)},
              ]}>{`Complete KYC`}</Text>
            <Text
              style={[
                styles.modalSubText,
              ]}>{`We need to verify your Account. Click on ‘Proceed’ to complete your KYC`}</Text>
            <ThemeButton
              title={`PROCEED`}
              style={styles.continueButton}
              styleText={{
                color: Colors.White,
                fontFamily: Fonts.DM_SemiBold,
              }}
              action={() => {
                setIsOpenKycModal(false);
                navigation.navigate('KYCOne');
              }}
              disabled={false}
            />
            {/* <ThemeButton
              title={`Skip for now`}
              style={[
                styles.continueButton,
                {backgroundColor: Colors.White, borderWidth: 0},
              ]}
              styleText={{
                color: Colors.PrimaryFirst,
                fontFamily: Fonts.DM_SemiBold,
              }}
              action={() => {
                setIsOpenKycModal(false);
              }}
              disabled={false}
            /> */}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
export default MyTruck;

const styles = StyleSheet.create({
  Container: {backgroundColor: Colors.PrimaryFirst, flex: 1},
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    // paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: Colors.PrimaryFirst,
  },
  mainView: {flex: 1},
  headerMain: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: Colors.PrimaryFirst,
    alignItems: 'center',
  },
  headerText: {
    fontSize: normalize(20),
    fontFamily: Fonts.SemiBold,
    color: Colors.White,
    textAlign: 'left',
    // marginTop: hp(3),
  },
  InnerContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: responsiveHeight(0.5),
  },
  tabContainer: {
    marginVertical: responsiveHeight(2),
    width: responsiveWidth(92),
    marginHorizontal: responsiveWidth(5),
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    shadowColor: Colors.PrimaryDark,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: Colors.White,
  },
  tabView: {
    backgroundColor: 'red',
    width: '50%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  tabTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(16),
  },
  loadNameTxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
  },
  QuateTxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_Bold,
    color: Colors.White,
  },
  LeadTypetxt: {
    fontSize: normalize(14),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
    flex: 1,
  },
  cityTxt: {
    fontSize: normalize(12),
    fontFamily: Fonts.DM_Bold,
    color: Colors.PrimaryFirst,
  },
  addressTxt: {
    fontSize: normalize(14),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.PrimaryFirst,
    flex: 1,
  },
  deviderView: {
    backgroundColor: Colors.border,
    height: 2,
    marginVertical: responsiveHeight(2),
  },
  driverProfileview: {
    backgroundColor: Colors.border,
    borderRadius: 10,
    padding: responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  continueButton: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
  label: {
    fontSize: normalize(18),
    fontFamily: Fonts.ExtraBold,
    color: Colors.PrimaryFirst,
    // marginVertical: 10,
    marginLeft: 5,
  },
  truckNumber: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.PrimaryFirst,
    marginLeft: 5,
    marginTop: 5,
  },
  verifyTxt: {
    fontSize: normalize(10),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
  },
});
