import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {ThemeButton} from '../../components/Button/themeButton';
import Pagination from '../../components/Other/Pagination';
import Icon from '../../components/Other/Icon';
import {toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';

function Explore(props) {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const baseOptions = {
    vertical: false,
    width: width * 0.8,
    height: width / 2.5,
  };

  const [isOpenKycModal, setIsOpenKycModal] = useState(false);
  const [data, setData] = useState([
    Images.imgPoster1,
    Images.imgPoster1,
    Images.imgPoster1,
    Images.imgPoster1,
    Images.imgPoster1,
    Images.imgPoster1,
    Images.imgPoster1,
  ]);
  const ref = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
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
        // setIsOpenKycModal(true);
      }
    });
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            style={styles.logoImage}
            source={Images.imgLogo}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={{
              backgroundColor: Colors.White,
              height: 40,
              width: 40,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              type={'Ionicons'}
              name={'notifications'}
              size={30}
              color={Colors.PrimaryFirst}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          bounces={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                type={'FontAwesome6'}
                name={'truck'}
                size={25}
                color={Colors.lightBlue}
              />
              <Text style={[styles.categoryTxt, {color: Colors.lightBlue}]}>
                {'All Trucks'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                type={'FontAwesome'}
                name={'exchange'}
                size={25}
                color={Colors.lightYellow}
              />
              <Text style={[styles.categoryTxt, {color: Colors.lightYellow}]}>
                {'Transactions'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                type={'Entypo'}
                name={'wallet'}
                size={25}
                color={Colors.lightOrange}
              />
              <Text style={[styles.categoryTxt, {color: Colors.lightOrange}]}>
                {'Wallet'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                type={'FontAwesome'}
                name={'user-plus'}
                size={25}
                color={Colors.lightGrey}
              />
              <Text style={[styles.categoryTxt, {color: Colors.lightGrey}]}>
                {'Refer & Earn'}
              </Text>
            </TouchableOpacity>
          </View>
          <Carousel
            {...baseOptions}
            loop={true}
            ref={ref}
            style={{width: '100%', marginTop: responsiveHeight(1)}}
            autoPlay={true}
            autoPlayInterval={2000}
            data={data}
            pagingEnabled={true}
            onSnapToItem={index => {}}
            renderItem={({item, index}) => (
              <View style={{flex: 1, marginLeft: '3%'}}>
                <View style={[styles.container]}>
                  <Image
                    cachePolicy={'memory-disk'}
                    key={index}
                    style={styles.image}
                    resizeMode="cover"
                    source={item}
                  />
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('TruckList')}
            style={styles.selectVehicalContainer}>
            <Icon
              type={'FontAwesome6'}
              name={'truck-fast'}
              size={45}
              color={Colors.PrimaryFirst}
            />
            <View style={{marginLeft: responsiveWidth(3), flex: 1}}>
              <Text style={styles.serviceText}>{'Select vehicle'}</Text>
              <Text style={styles.serviceSubText}>
                {'Looking for trucks to transport your load'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PostLoads')}
            style={styles.selectVehicalContainer}>
            <Icon
              type={'FontAwesome5'}
              name={'boxes'}
              size={45}
              color={Colors.PrimaryFirst}
            />
            <View style={{marginLeft: responsiveWidth(3), flex: 1}}>
              <Text style={styles.serviceText}>{'Post load'}</Text>
              <Text style={styles.serviceSubText}>
                {'You drive a truck to pick-up and deliver loads'}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Modal
        visible={isOpenKycModal}
        transparent={true}
        animationType="slide"
        // onRequestClose={() => setIsOpenKycModal(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={(event: any) => {
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
    </>
  );
}
export default Explore;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: Colors.White,
    paddingBottom: responsiveHeight(10),
    // paddingHorizontal: responsiveWidth(3),
  },
  logoContainer: {
    paddingHorizontal: responsiveWidth(3),
    backgroundColor: Colors.PrimaryFirst,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoImage: {
    width: '50%',
  },
  topContainer: {
    backgroundColor: Colors.PrimaryFirst,
    height: responsiveHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(3),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
    // borderWidth: 2,
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
  categoryTxt: {
    color: Colors.White,
    fontFamily: Fonts.Medium,
    fontSize: normalize(12),
    marginTop: responsiveHeight(2),
  },
  selectVehicalContainer: {
    borderColor: Colors.PrimaryFirst,
    borderWidth: 1,
    padding: responsiveWidth(3),
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(12),
  },
  serviceText: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(16),
    // textAlign: 'center',
  },
  serviceSubText: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(12),
    marginTop: responsiveHeight(1),
  },
});
