import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import Icon from '../../components/Other/Icon';
import {ThemeButton} from '../../components/Button/themeButton';
import {toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';
import moment from 'moment';

function MyBooking(props) {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState(1);
  const [isOpenKycModal, setIsOpenKycModal] = useState(false);

  const [loadList, setLoadList] = useState([
    {
      id: 1,
      loadName: 'Paper Roll',
      loadType: 'Medium',
      weight: '300 Kg',
      addressList: [
        {
          id: 1,
          type: 'P',
          address:
            'cysbn dcjbsd vsjbhdv vjdsbvdsj vsdjsjbv vjdbvsd  - 222223232',
          city: 'Ahmedabad',
          state: 'Gujrat',
          date: '20/01/2024',
        },
        {
          id: 2,
          type: 'D',
          address:
            'cysbn dcjbsd vsjbhdv vjdsbvdsj vsdjsjbv vjdbvsd  - 222223232',
          city: 'Surat',
          state: 'Gujrat',
          date: '20/01/2024',
        },
      ],
      priceType: 'fix',
      price: '25000',
    },
    {
      id: 2,
      loadName: 'Paper Roll',
      loadType: 'Medium',
      weight: '300 Kg',
      addressList: [
        {
          id: 1,
          type: 'P',
          address:
            'cysbn dcjbsd vsjbhdv vjdsbvdsj vsdjsjbv vjdbvsd  - 222223232',
          city: 'Ahmedabad',
          state: 'Gujrat',
          date: '20/01/2024',
        },
        {
          id: 2,
          type: 'D',
          address:
            'cysbn dcjbsd vsjbhdv vjdsbvdsj vsdjsjbv vjdbvsd  - 222223232',
          city: 'Surat',
          state: 'Gujrat',
          date: '20/01/2024',
        },
      ],
      priceType: 'fix',
      price: '25000',
    },
    {
      id: 3,
      loadName: 'Paper Roll',
      loadType: 'Medium',
      weight: '300 Kg',
      addressList: [
        {
          id: 1,
          type: 'P',
          address:
            'cysbn dcjbsd vsjbhdv vjdsbvdsj vsdjsjbv vjdbvsd  - 222223232',
          city: 'Ahmedabad',
          state: 'Gujrat',
          date: '20/01/2024',
        },
        {
          id: 2,
          type: 'D',
          address:
            'cysbn dcjbsd vsjbhdv vjdsbvdsj vsdjsjbv vjdbvsd  - 222223232',
          city: 'Surat',
          state: 'Gujrat',
          date: '20/01/2024',
        },
      ],
      priceType: 'fix',
      price: '25000',
    },
  ]);

  useEffect(() => {
    // setMessageList(MessageList);
    const unsubscribe = navigation.addListener('focus', () => {
      callGetBookin(1);
      getUserData();
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
        setIsOpenKycModal(true);
      }
    });
  };

  const callGetBookin = typeOfList => {
    toggleLoader(true);

    let params = {
      per_page: 10,
    };

    let type = '';
    if (typeOfList == 1) {
      type = 'confirmed'; //out_of_pickup,out_of_drop,reached
    } else if (typeOfList == 2) {
      type = 'completed';
    } else {
      type = 'pending,accepted';
    }

    APIManager.callGetApi(
      `${Method.POST_LOAD}?per_page=1000&status=${type}`, //out_of_pickup,out_of_drop,reached
      params,
      props,
      response => {
        toggleLoader(false);
        console.log(
          'API - response - get Post load   ==> ',
          JSON.stringify(response.data.data),
        );
        console.log('postLoads  ===>', response.data.data);
        let listOfLoad = response.data.data;
        setLoadList(listOfLoad);
      },
    );
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        disabled={true}
        style={{
          borderColor: Colors.PrimaryFirst,
          borderWidth: 2,
          borderRadius: 10,
          marginTop: responsiveHeight(2),
          overflow: 'hidden',
        }}>
        <View
          style={{
            backgroundColor: Colors.PrimaryFirst,
            padding: responsiveWidth(3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={styles.loadNameTxt}>{item.name}</Text>
            <Text style={[styles.label, {marginVertical: 0}]}>
              {`Load Type ${item.load_type} `}
              <Text style={styles.weightTxt}>{`( ${item.weight} ${
                item.load_type == 1 ? 'KG' : 'Ton'
              } )`}</Text>
            </Text>
          </View>
        </View>
        {item.pickup_from && (
          <View style={{padding: responsiveWidth(3)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Colors.border,
                  width: '45%',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Icon
                  type={'Ionicons'}
                  name={'location'}
                  size={25}
                  color={Colors.PrimaryFirst}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.cityTxt}>{`${
                    item.pickup_from.date
                      ? moment(item.pickup_from.date, 'DD/MM/YYYY').format(
                          'dddd DD, MMM',
                        )
                      : ''
                  }`}</Text>
                  <Text
                    numberOfLines={1}
                    style={
                      styles.addressTxt
                    }>{`${item.pickup_from?.address}`}</Text>
                </View>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.addressTxt, {flex: 0}]}>{`--->`}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Colors.border,
                  width: '45%',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Icon
                  type={'Ionicons'}
                  name={'location'}
                  size={25}
                  color={Colors.PrimaryFirst}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.cityTxt}>{`${
                    item.pickup_from.date
                      ? moment(item.drop_to.date, 'DD/MM/YYYY').format(
                          'dddd DD, MMM',
                        )
                      : ''
                  }`}</Text>
                  <Text
                    numberOfLines={1}
                    style={
                      styles.addressTxt
                    }>{`${item.drop_to?.address}`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.deviderView} />
            <View style={styles.driverProfileview}>
              <View style={{flex: 1}}>
                <Text style={styles.addressTxt}>{'Gj XX AB XXXX'}</Text>
                <Text
                  style={[
                    styles.label,
                    {marginVertical: 0, color: Colors.PrimaryFirst},
                  ]}>
                  {'Current Location -'}{' '}
                  <Text
                    style={[
                      styles.weightTxt,
                      {color: Colors.PrimaryFirst},
                    ]}>{`Ahmd`}</Text>
                </Text>
              </View>
              {selectedTab == 1 && (
                <ThemeButton
                  title={`Track Load`}
                  style={{minHeight: 40}}
                  styleText={{
                    color: Colors.White,
                    fontSize: normalize(12),
                  }}
                  action={() => {
                    navigation.navigate('TrackLoad', {load: item});
                  }}
                  disabled={false}
                />
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.logoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{`My Booking`}</Text>
        </View>
      </View>

      <View style={styles.InnerContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => {
              callGetBookin(1);
              setSelectedTab(1);
            }}
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
              {'On-Going'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              callGetBookin(2);
              setSelectedTab(2);
            }}
            style={[
              styles.tabView,
              {
                backgroundColor:
                  selectedTab == 2 ? Colors.PrimaryFirst : Colors.White,
              },
            ]}>
            <Text
              style={[
                styles.tabTxt,
                {color: selectedTab == 2 ? Colors.White : Colors.PrimaryFirst},
              ]}>
              {'Completed'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              callGetBookin(3);
              setSelectedTab(3);
            }}
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
              {'Requested'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            paddingTop: responsiveHeight(2),
            paddingBottom: responsiveHeight(5),
            paddingHorizontal: responsiveWidth(3),
          }}
          showsVerticalScrollIndicator={false}
          data={loadList}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => <View style={{}} />}
        />
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
export default MyBooking;

const styles = StyleSheet.create({
  Container: {backgroundColor: Colors.PrimaryFirst, flex: 1},
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    // paddingVertical: responsiveHeight(2),
    alignItems: 'center',
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
    width: '33.33%',
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
  label: {
    fontSize: normalize(14),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
    marginVertical: 10,
  },
  weightTxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_Bold,
    color: Colors.White,
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
});
