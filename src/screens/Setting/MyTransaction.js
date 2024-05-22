import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useEffect} from 'react';
import Icon from '../../components/Other/Icon';
import {Colors} from '../../common/colors';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';

const HIT_SLOP = {top: 20, bottom: 20, left: 20, right: 20};

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
function MyTransaction() {
  const navigation = useNavigation();

  const [notificationList, setNotificationList] = useState([]);

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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.White}
          />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{`Transactions`}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.container}>
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  scrollView: {flexGrow: 1, paddingBottom: responsiveHeight(5)},

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
  },
  container: {
    marginHorizontal: responsiveWidth(5),
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(18),
    marginLeft: responsiveWidth(5),
    // textAlign: 'center',
  },
  leftStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
    position: 'relative',
    zIndex: 1,
    flexShrink: 1,
  },
  iconStyle: {
    marginLeft: responsiveWidth(2),
    width: responsiveWidth(10),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: Colors.border,
  },
  containerPadding: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  planMainContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
  },
  cardContainer: {},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionTxt: {
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(18),
    color: Colors.PrimaryFirst,
    flex: 1,
  },
  answertxt: {
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(16),
    color: Colors.greyDark3,
    marginTop: responsiveHeight(1),
    lineHeight: 28,
  },
  horiziontalLine: {
    backgroundColor: Colors.border,
    height: 1,
    marginVertical: responsiveHeight(2),
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
});

export default MyTransaction;
