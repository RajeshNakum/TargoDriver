import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {Colors} from '../../common/colors';
import {Fonts, hitSlop, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import Icon from '../../components/Other/Icon';
import {ThemeButton} from '../../components/Button/themeButton';
import APIManager from '../../Api/APIManager';
import { Method } from '../../Api/APIConstant';
import { toggleLoader } from '../../config/functions';
import APISessionManger from '../../Api/APISessionManger';

function Home(props) {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [userData, setUserData] = useState([]);

  // UseEffect - Get userdata from localstorage
  useEffect(() => {
    async function fetchUserData() {
      let userData = await APISessionManger.getUserData();
      setUserData(userData);
    }

    fetchUserData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });

    return unsubscribe;
  }, []);

  // API Calling - Logout Profile api
  const callLogoutUser = () => {
    toggleLoader(true);
    let params = {};

    APIManager.callGetApi(Method.LOGOUT, params, props, response => {
      setLogoutModal(false);
      APISessionManger.removeAll();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        }),
      );
    });
  };


  return (
    <View style={styles.Container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.White}
          /> */}
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{'My Account'}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          bounces={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.userIcon}>
                <Icon
                  type="FontAwesome5"
                  name={'user-circle'}
                  size={40}
                  color={Colors.PrimaryFirst}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  marginLeft: responsiveWidth(3),
                }}>
                <Text style={styles.userNameTxt}>{`${userData.name}`}</Text>
                <Text style={styles.emailtxt}>{`${userData.email}`}</Text>
              </View>
              <View style={{height: '100%'}}>
                <TouchableOpacity
                  hitSlop={hitSlop}
                  onPress={() => navigation.navigate('EditProfile')}>
                  <Text style={styles.editTxt}>{'Edit'} </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.otherView}>
            <View style={styles.otherInnerView}>
              <View style={styles.TxtContainer}>
                <Icon
                  type={'Ionicons'}
                  name={'notifications'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>{'Notification'} </Text>
              </View>
              <TouchableOpacity
                onPress={() => setToggleNotification(!toggleNotification)}>
                <Icon
                  type="FontAwesome6"
                  name={toggleNotification ? 'toggle-on' : 'toggle-off'}
                  size={30}
                  color={Colors.PrimaryDark}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.hr} />
            <TouchableOpacity
              hitSlop={hitSlop}
              style={styles.otherInnerView}
              onPress={() => navigation.navigate('KYCOne')}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="FontAwesome"
                  name={'drivers-license'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>
                  {'Complete KYC'}{' '}
                  <Text style={styles.percentageTxt}>{'(60%)'} </Text>{' '}
                </Text>
              </View>
              <Icon
                type="FontAwesome6"
                name={'chevron-right'}
                size={20}
                color={Colors.PrimaryDark}
              />
            </TouchableOpacity>
            <View style={styles.hr} />

            <TouchableOpacity
              hitSlop={hitSlop}
              style={styles.otherInnerView}
              onPress={() => navigation.navigate('Document')}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="Ionicons"
                  name={'document-text'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>{'Documents'}</Text>
              </View>
              <Icon
                type="FontAwesome6"
                name={'chevron-right'}
                size={20}
                color={Colors.PrimaryDark}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('MyTransaction')}
              hitSlop={hitSlop}
              style={styles.otherInnerView}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="MaterialIcons"
                  name={'history'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>{'Payment History'} </Text>
              </View>
              <Icon
                type="FontAwesome6"
                name={'chevron-right'}
                size={20}
                color={Colors.PrimaryDark}
              />
            </TouchableOpacity>
            <View style={styles.hr} /> */}

            {/* <TouchableOpacity hitSlop={hitSlop} style={styles.otherInnerView}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="FontAwesome6"
                  name={'credit-card'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>{'Payment Methods'} </Text>
              </View>
              <Icon
                type="FontAwesome6"
                name={'chevron-right'}
                size={20}
                color={Colors.PrimaryDark}
              />
            </TouchableOpacity> */}
            {/* <View style={styles.hr} /> */}
          </View>

          <View style={styles.otherView}>
            <TouchableOpacity
              hitSlop={hitSlop}
              style={styles.otherInnerView}
              onPress={() => navigation.navigate('Help')}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="Feather"
                  name={'help-circle'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>{'Help Center'} </Text>
              </View>
              <Icon
                type="FontAwesome6"
                name={'chevron-right'}
                size={20}
                color={Colors.PrimaryDark}
              />
            </TouchableOpacity>
            <View style={styles.hr} />

            <TouchableOpacity
              onPress={() => navigation.navigate('PrivacyPolicy')}
              hitSlop={hitSlop}
              style={styles.otherInnerView}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="MaterialCommunityIcons"
                  name={'text-box-multiple'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>{'Terms & Privacy Policy'} </Text>
              </View>
              <Icon
                type="FontAwesome6"
                name={'chevron-right'}
                size={20}
                color={Colors.PrimaryDark}
              />
            </TouchableOpacity>
            <View style={styles.hr} />

            <TouchableOpacity
              onPress={() => navigation.navigate('FAQs')}
              hitSlop={hitSlop}
              style={styles.otherInnerView}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="AntDesign"
                  name={'exclamationcircleo'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>{`FAQ's`} </Text>
              </View>
              <Icon
                type="FontAwesome6"
                name={'chevron-right'}
                size={20}
                color={Colors.PrimaryDark}
              />
            </TouchableOpacity>
            <View style={styles.hr} />

            <TouchableOpacity
              onPress={() => navigation.navigate('SendFeedback')}
              hitSlop={hitSlop}
              style={styles.otherInnerView}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="MaterialIcons"
                  name={'feedback'}
                  size={20}
                  color={Colors.PrimaryDark}
                />
                <Text style={styles.otherTxt}>{'FeedBack'} </Text>
              </View>
              <Icon
                type="FontAwesome6"
                name={'chevron-right'}
                size={20}
                color={Colors.PrimaryDark}
              />
            </TouchableOpacity>
            <View style={styles.hr} />

            <TouchableOpacity
              onPress={() => {
                setDeleteAccountModal(true);
              }}
              hitSlop={hitSlop}
              style={styles.otherInnerView}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="MaterialCommunityIcons"
                  name={'delete'}
                  size={20}
                  color={Colors.Red}
                />
                <Text style={[styles.otherTxt, {color: Colors.Red}]}>
                  {'Delete Account'}{' '}
                </Text>
              </View>
              {/* <Icon
              type="FontAwesome6"
              name={'chevron-right'}
              size={20}
              color={Colors.PrimaryDark}
            /> */}
            </TouchableOpacity>
            <View style={styles.hr} />

            <TouchableOpacity
              onPress={() => {
                setLogoutModal(true);
              }}
              hitSlop={hitSlop}
              style={styles.otherInnerView}>
              <View style={styles.TxtContainer}>
                <Icon
                  type="MaterialCommunityIcons"
                  name={'logout'}
                  size={20}
                  color={Colors.PrimaryFirst}
                />
                <Text style={[styles.otherTxt, {color: Colors.PrimaryFirst}]}>
                  {'Logout'}{' '}
                </Text>
              </View>
              {/* <Icon
              type="FontAwesome6"
              name={'chevron-right'}
              size={20}
              color={Colors.PrimaryDark}
            /> */}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: responsiveWidth(3),
              marginTop: responsiveHeight(2),
            }}>
            <Text style={styles.versionTxt}>{'V 1.0.0'}</Text>
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={deleteAccountModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteAccountModal(false)}>
        <Pressable
          style={styles.modalContainer}
          onPress={(event: any) => {
            if (event.target == event.currentTarget) {
              setDeleteAccountModal(false);
            }
          }}>
          <View
            style={[
              styles.modalContent,
              {width: responsiveWidth(80), alignItems: 'center'},
            ]}>
            <Image
              source={Images.imgDelete}
              resizeMode="contain"
              style={{width: responsiveWidth(25), height: responsiveHeight(15)}}
            />
            <Text
              style={[
                styles.modalHeader,
                {marginTop: responsiveHeight(2), color: Colors.Red},
              ]}>{`Delete Account`}</Text>
            <Text
              style={[
                styles.modalSubText,
              ]}>{`Permanently delete your account, removing all data, profiles, and information associated with it. This action cannot be undone.`}</Text>
            <ThemeButton
              title={`Delete Account`}
              style={styles.continueButton}
              styleText={{
                color: Colors.White,
                fontFamily: Fonts.DM_SemiBold,
              }}
              action={() => {
                setDeleteAccountModal(false);
              }}
              disabled={false}
            />
            <ThemeButton
              title={`Cancel`}
              style={[
                styles.continueButton,
                {backgroundColor: Colors.White, borderWidth: 0},
              ]}
              styleText={{
                color: Colors.PrimaryFirst,
                fontFamily: Fonts.DM_SemiBold,
              }}
              action={() => {
                setDeleteAccountModal(false);
              }}
              disabled={false}
            />
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={logoutModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLogoutModal(false)}>
        <Pressable
          style={styles.modalContainer}
          onPress={(event: any) => {
            if (event.target == event.currentTarget) {
              setLogoutModal(false);
            }
          }}>
          <View
            style={[
              styles.modalContent,
              {width: responsiveWidth(90), alignItems: 'center'},
            ]}>
            <Text
              style={[
                styles.modalHeader,
                {marginTop: responsiveHeight(2), textAlign: 'center'},
              ]}>{`Are you sure you want to Logout?`}</Text>
            {/* <Text
              style={[
                styles.modalSubText,
              ]}>{`Permanently delete your account, removing all data, profiles, and information associated with it. This action cannot be undone.`}</Text> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <ThemeButton
                title={`Cancel`}
                style={[
                  styles.continueButton,
                  {
                    backgroundColor: Colors.White,
                    borderWidth: 0,
                    width: '48%',
                    borderColor: Colors.PrimaryFirst,
                    borderWidth: 1,
                  },
                ]}
                styleText={{
                  color: Colors.PrimaryFirst,
                  fontFamily: Fonts.DM_SemiBold,
                }}
                action={() => {
                  setLogoutModal(false);
                }}
                disabled={false}
              />

              <ThemeButton
                title={`Logout`}
                style={[styles.continueButton, {width: '48%'}]}
                styleText={{
                  color: Colors.White,
                  fontFamily: Fonts.DM_SemiBold,
                }}
                action={() => {
                  callLogoutUser();
                }}
                disabled={false}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
export default Home;

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
  InnerContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: responsiveHeight(0.5),
    // paddingHorizontal: responsiveWidth(5),
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(5),
  },
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(18),
    // marginLeft: responsiveWidth(5),
    // textAlign: 'center',
  },
  // scrollView: {
  //   flexGrow: 1,
  //   backgroundColor: Colors.White,
  //   paddingBottom: responsiveHeight(10),
  // },
  headerContainer: {
    backgroundColor: Colors.PrimaryFirst,
    marginTop: responsiveHeight(2),
    padding: responsiveWidth(2),
    // height: responsiveHeight(28),
    marginHorizontal: responsiveWidth(3),
    borderRadius: 10,
    overflow: 'hidden',
  },
  userIcon: {
    width: responsiveWidth(15),
    aspectRatio: 1,
    backgroundColor: Colors.White,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(18),
    color: Colors.White,
  },
  emailtxt: {
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(12),
    color: Colors.White,
  },
  editTxt: {
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(15),
    color: Colors.White,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  otherView: {
    backgroundColor: Colors.White,
    marginHorizontal: responsiveWidth(3),
    elevation: 2,
    borderRadius: 10,
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(3),
  },
  otherInnerView: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(2),
  },
  TxtContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherTxt: {
    fontFamily: Fonts.DM_Medium,
    fontSize: normalize(16),
    color: Colors.PrimaryDark,
    marginLeft: responsiveWidth(3),
  },
  hr: {
    height: 1,
    backgroundColor: Colors.border,
  },
  versionTxt: {
    textAlign: 'right',
    flex: 1,
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(12),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
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
  percentageTxt: {
    fontFamily: Fonts.ExtraBold,
    fontSize: normalize(16),
    color: Colors.PrimaryFirst,
  },
});
