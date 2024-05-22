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
import {toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';

function TruckBooking(props) {
  const navigation = useNavigation();

  const [isOpenKycModal, setIsOpenKycModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

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
      status: 'P',
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
      status: 'P',
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
      status: 'P',
    },
  ]);

  const [requestList, setRequestList] = useState([
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
      status: 'R',
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
      status: 'R',
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
      status: 'R',
    },
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // getUsserData();
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
            <Text style={styles.loadNameTxt}>{item.loadName}</Text>
            <Text style={[styles.label, {marginVertical: 0}]}>
              {`${item.loadType} `}
              <Text style={styles.weightTxt}>{`( ${item.weight} )`}</Text>
            </Text>
          </View>
        </View>
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
                <Text style={styles.cityTxt}>{`Monday 25, Apr `}</Text>
                <Text
                  numberOfLines={1}
                  style={styles.addressTxt}>{`Ahmedadbad`}</Text>
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
                <Text style={styles.cityTxt}>{`Thursday 27, Apr`}</Text>
                <Text
                  numberOfLines={1}
                  style={styles.addressTxt}>{`Ahmedadbad`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.deviderView} />
          <View style={styles.driverProfileview}>
            <View style={{flex: 1}}>
              <Text style={[styles.loadNameTxt, {color: Colors.PrimaryFirst}]}>
                {'Lokesh G'}
              </Text>
              <Text
                style={[
                  styles.weightTxt,
                  {color: Colors.PrimaryFirst},
                ]}>{`Ahmedabad`}</Text>
            </View>
            <ThemeButton
              title={`Track Load`}
              style={{minHeight: 40}}
              styleText={{
                color: Colors.White,
                fontSize: normalize(12),
              }}
              action={() => {
                navigation.navigate('TrackLoad');
              }}
              disabled={false}
            />
          </View>
          {item.status == 'R' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: responsiveHeight(2),
              }}>
              <ThemeButton
                title={`Raject`}
                style={{
                  backgroundColor: Colors.White,
                  borderColor: Colors.Red,
                  borderWidth: 1,
                  flex: 0.49,
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
                leftIconName={'cross'}
                iconColor={Colors.Red}
              />
              <ThemeButton
                title={`Accept`}
                style={{flex: 0.49}}
                styleText={{
                  color: Colors.White,
                  fontSize: normalize(16),
                }}
                action={() => {
                  navigation.navigate('TrackLoad');
                }}
                disabled={false}
                leftIcon={true}
                leftIconType={'Entypo'}
                leftIconName={'check'}
                iconColor={Colors.White}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.logoContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              type={'AntDesign'}
              name={'arrowleft'}
              size={25}
              color={Colors.White}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>{`GJ 00 AB 0101`}</Text>
        </View>
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
              {'On-Going'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab(2)}
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
          data={selectedTab == 3 ? requestList : loadList}
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
export default TruckBooking;

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
    marginLeft: responsiveWidth(3),
    flex: 1,
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
});
