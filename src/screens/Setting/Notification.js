import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
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
        message:
          'Your hassle-free journey is now confirmed with Transit Ease Platform',
        username: 'Payment Done Successfully!',
        time: '2:35 pm',
        type: 'likePOst',
      },
      {
        id: 2,
        message:
          'Your hassle-free journey is now confirmed with Transit Ease Platform',
        username: 'Credit Card added!',
        time: '2:35 pm',
        type: 'followRequest',
      },
      {
        id: 3,
        message:
          'Your hassle-free journey is now confirmed with Transit Ease Platform',
        username: 'Added Money to wallet Successfully',
        time: '2:35 pm',
        type: 'likePOst',
      },
    ],
  },
  {
    id: 1,
    day: 'This Week',
    notifications: [
      {
        id: 1,
        message:
          'Your hassle-free journey is now confirmed with Transit Ease Platform',
        time: '2:35 pm',
        username: '5% Special Discount!',
        type: 'followRequest',
      },
      {
        id: 2,
        message:
          'Your hassle-free journey is now confirmed with Transit Ease Platform',
        time: '2:35 pm',
        username: 'Payment Done Successfully!',
        type: 'likePOst',
      },
      {
        id: 3,
        message:
          'Your hassle-free journey is now confirmed with Transit Ease Platform',
        time: '2:35 pm',
        username: 'Added Money to wallet Successfully',
        type: 'followRequest',
      },
      {
        id: 4,
        message:
          'Your hassle-free journey is now confirmed with Transit Ease Platform',
        time: '2:35 pm',
        username: '30% Special Discount!',
        type: 'likePOst',
      },
    ],
  },
];
function Notification() {
  const navigation = useNavigation();

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    setNotificationList(NotificationData);
  }, []);

  const renderNotification = item => {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.CommentCard}>
        <View
          style={{
            backgroundColor: Colors.PrimaryFirst30,
            width: responsiveWidth(15),
            height: responsiveWidth(15),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={Images.imgNotification}
            resizeMode="contain"
            style={{width: '40%'}}
          />
        </View>
        <View style={styles.commentTextMainView}>
          <View style={styles.commentProfileView}>
            <Text style={styles.profileNameText}>{item.username}</Text>
            <Text
              style={{
                color: Colors.LightGrey,
                fontSize: normalize(12),
                fontFamily: Fonts.DM_Regular,
                marginTop: 5,
              }}>
              {item.message}
            </Text>
          </View>
          <Text style={styles.timeTxt}>{item.time}</Text>
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
        <Text style={styles.headerTxt}>{`Notification`}</Text>
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
  commentProfileView: {},
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
});

export default Notification;
