import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts, FontSize, normalize} from '../../assets/Fonts';
// import BackButton from '../../components/Button/BackButton';
// import {Icon, Images} from '../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import {Colors} from '../../common/colors';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import Icon from '../../components/Other/Icon';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

const NotificationData = [
  {
    id: 1,
    day: 'Today',
    notifications: [
      {
        id: 1,
        message: 'Mumbai - Pune',
        username: 'Steel',
        weight: '4 Tonn',
        time: '2:35 pm',
        type: 'likePOst',
        transaction: 'RS. 4500.00',
        status: 'S',
      },
      {
        id: 2,
        message: 'Mumbai - Pune',
        username: 'Rice',
        weight: '10 Tonn',
        time: '2:35 pm',
        type: 'followRequest',
        transaction: 'RS. 4500.00',
        status: 'R',
      },
      {
        id: 3,
        message: 'Mumbai - Pune',
        username: 'Cotton',
        weight: '20 Tonn',
        time: '2:35 pm',
        type: 'likePOst',
        transaction: 'RS. 4500.00',
        status: 'P',
      },
    ],
  },
];
function QuatationScreen() {
  const navigation = useNavigation();

  const [notificationList, setNotificationList] = useState([]);

  const [selectedTruck, setSelectedTruck] = useState('');
  const [truckList, setTruckList] = useState([
    {
      id: 1,
      Number: 'GJ 00 AB 0101',
      type: 'A',
    },
    {
      id: 2,
      Number: 'GJ 00 AB 0202',
      type: 'B',
    },
    {
      id: 3,
      Number: 'GJ 00 AB 0303',
      type: 'C',
    },
  ]);

  useEffect(() => {
    setNotificationList(NotificationData);
  }, []);

  const renderNotification = item => {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.CommentCard}>
        <View style={styles.commentTextMainView}>
          <View style={styles.commentProfileView}>
            <Text style={[styles.profileNameText]}>
              {item.username}{' '}
              <Text style={styles.timeTxt}>{` (${item.weight})`}</Text>
            </Text>
            <Text
              style={{
                color: Colors.PrimaryFirst,
                fontSize: normalize(14),
                fontFamily: Fonts.DM_Regular,
              }}>
              {item.message}
            </Text>
          </View>
          <View style={[styles.commentProfileView, {marginTop: 5}]}>
            <Text
              style={[
                styles.redPriceTxt,
                {
                  color:
                    item.status == 'P'
                      ? Colors.Yellow
                      : item.status == 'S'
                      ? Colors.Green
                      : Colors.Red,
                },
              ]}>
              {item.transaction}
            </Text>
            <Text style={styles.timeTxt}>{item.time}</Text>
          </View>
          {item.status == 'S' && (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://wise.com/imaginary-v2/images/8d543af756864231e8bfa6532a230bd5-in-invoice-template-PDF-2.pdf',
                )
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Icon
                type={'FontAwesome6'}
                name={'file-invoice'}
                size={25}
                color={Colors.PrimaryFirst}
              />
              <Text
                style={{
                  color: Colors.PrimaryFirst,
                  fontFamily: Fonts.DM_SemiBold,
                  fontSize: normalize(16),
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  marginLeft: 10,
                }}>
                {'Create Invoice'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.logoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{`Payment History`}</Text>
        </View>
      </View>

      <View style={styles.InnerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={truckList}
            maxHeight={200}
            placeholder={'Select Truck'}
            searchPlaceholder="Search..."
            value={selectedTruck}
            onChange={item => {
              setSelectedTruck(item.value);
            }}
            itemTextStyle={{color: Colors.PrimaryFirst}}
            selectedTextStyle={styles.labeltxt}
            labelField={'Number'}
            valueField={'type'}
          />

          <View style={{}}>
            {notificationList.map(data => (
              <>
                <Text
                  style={{
                    color: Colors.PrimaryDark,
                    fontSize: normalize(16),
                    fontFamily: Fonts.Bold,
                    marginTop: responsiveHeight(2),
                  }}>
                  {data.day}
                </Text>
                <FlatList
                  data={data.notifications}
                  showsVerticalScrollIndicator={false}
                  // ItemSeparatorComponent={<View style={styles.horiziontalLine} />}
                  renderItem={({item, index}) =>
                    renderNotification(item, index)
                  }
                  keyExtractor={item => item.id}
                  contentContainerStyle={{marginTop: responsiveHeight(1)}}
                />
              </>
            ))}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
export default QuatationScreen;

const styles = StyleSheet.create({
  Container: {backgroundColor: Colors.PrimaryFirst, flex: 1},
  RenderItem: {flexDirection: 'row', backgroundColor: Colors.White},
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: wp(3),
    paddingVertical: hp(2),
  },
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
    paddingHorizontal: wp(5),
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
    paddingTop: hp(0.5),
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(3),
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
  kmTxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_Bold,
    color: Colors.LightGrey,
  },
  addressTxt: {
    fontSize: normalize(14),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.PrimaryFirst,
    flex: 1,
  },
  CommentCard: {
    paddingVertical: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(0.5),
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: Colors.grey30,
  },
  commentTextMainView: {flex: 1, marginLeft: responsiveWidth(3)},
  commentProfileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileNameText: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.PrimaryDark,
  },
  createdAtText: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_Regular,
    color: Colors.lightGrey,
  },
  timeTxt: {
    marginTop: responsiveHeight(1),
    fontSize: normalize(14),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.PrimaryFirst,
  },
  actionView: {flexDirection: 'row'},
  redPriceTxt: {
    fontSize: normalize(18),
    fontFamily: Fonts.DM_Bold,
    color: Colors.Red,
  },
  dropdown: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.White,
    borderColor: Colors.PrimaryFirst,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: responsiveHeight(1),
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
