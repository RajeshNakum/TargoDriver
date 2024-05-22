import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
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
import {toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';
import moment from 'moment';
import APISessionManger from '../../Api/APISessionManger';

const MessageList = [
  {
    id: 1,
    sender: 'me',
    reciever: 'JohnDoe',
    type: 'text',
    message: 'Hello!',
    time: '13:04',
  },
  {
    id: 2,
    sender: 'JohnDoe',
    reciever: 'me',
    type: 'text',
    message: 'Hiii!',
    time: '13:04',
  },
  {
    id: 3,
    sender: 'me',
    reciever: 'JohnDoe',
    type: 'text',
    message: 'How are you?',
    time: '13:04',
  },
  {
    id: 4,
    sender: 'JohnDoe',
    reciever: 'me',
    type: 'text',
    message: "I'm fine and you?",
    time: '13:04',
  },
  {
    id: 5,
    sender: 'me',
    reciever: 'JohnDoe',
    type: 'text',
    message: 'Good',
    time: '13:04',
  },
  {
    id: 6,
    sender: 'JohnDoe',
    reciever: 'me',
    type: 'text',
    message: 'can you share me your profile pic?',
    time: '13:05',
  },
  {
    id: 7,
    sender: 'me',
    reciever: 'JohnDoe',
    type: 'text',
    message: 'yes, sure!',
    time: 'Now',
  },
  {
    id: 8,
    sender: 'JohnDoe',
    reciever: 'me',
    type: 'Image',
    message: Images.imgPoster1,
    time: 'Now',
  },
];
function QuatationScreen(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     message: '',
  //     messageList: [],
  //   };
  // }

  // componentDidMount() {
  //   this.setState({messageList: MessageList});
  // }

  const navigation = useNavigation();

  const [loadList, setLoadList] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // setMessageList(MessageList);
    const unsubscribe = navigation.addListener('focus', () => {
      async function fetchData() {
        let userdata = await APISessionManger.getUserData();
        setUserData(userdata);
        callGetAddress();
      }
      fetchData();
    });

    return unsubscribe;
  }, []);

  const callGetAddress = () => {
    toggleLoader(true);

    let params = {
      per_page: 10,
    };

    APIManager.callGetApi(
      `${Method.GET_LOAD_LIST}?per_page=1000&status=pending`,
      params,
      props,
      response => {
        toggleLoader(false);
        console.log(
          'API - response - get Post load   ==> ',
          `${Method.GET_LOAD_LIST}?per_page=1000&status=pending`,
          response,
        );
        console.log('postLoads  ===>', response.data.data);
        setLoadList(response.data.data);
      },
    );
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('QuatationScreen', {
            senderData: userData,
            recieverId: item.user_id,
            loadId: item.id,
            loadUserDetails: item.users_details,
          })
        }
        style={{
          // backgroundColor: 'red',
          // padding: responsiveWidth(3),
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
            }}>
            <Text style={styles.loadNameTxt}>{item.name}</Text>
            {/* <Text style={styles.QuateTxt}>{`Quate (0)`}</Text> */}
          </View>
          <Text style={styles.label}>
            {`Load Type ${item.load_type} `}
            <Text style={styles.weightTxt}>{`( ${item.weight} ${
              item.load_type == 1 ? 'KG' : 'Ton'
            } )`}</Text>
          </Text>
          {item.price_amount != '' && (
            <Text style={styles.label}>
              {`Price - ${item.price_amount} `}
              <Text style={styles.weightTxt}>{`/ ${
                item.load_type == 1 ? '-' : 'Ton'
              }`}</Text>
            </Text>
          )}
        </View>
        <View style={{padding: responsiveWidth(3)}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              type={'Ionicons'}
              name={'location'}
              size={25}
              color={Colors.PrimaryFirst}
            />
            <Text style={styles.addressTxt}>
              {`Pick-up - ${item.pickup_from.city} (${moment(
                item.pickup_from.date,
              ).format('DD/MM/YYYY hh:mm a')})`}
            </Text>
          </View>
          <View
            style={{
              borderLeftColor: Colors.PrimaryFirst,
              borderLeftWidth: 2,
              borderStyle: 'dashed',
              height: 35,
              marginLeft: 10,
              marginVertical: 2,
              justifyContent: 'center',
              paddingLeft: responsiveWidth(5),
            }}>
            <Text style={styles.kmTxt}>{`${item.distance_in_km} KM`}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              type={'Ionicons'}
              name={'location'}
              size={25}
              color={Colors.PrimaryFirst}
            />
            <Text style={styles.addressTxt}>
              {`Drop - ${item.drop_to.city} (${moment(item.drop_to.date).format(
                'DD/MM/YYYY hh:mm a',
              )})`}
            </Text>
          </View>
          {/* {item.addressList.map((addressItem, addressIndex) => (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  type={'Ionicons'}
                  name={'location'}
                  size={25}
                  color={Colors.PrimaryFirst}
                />
                <Text style={styles.addressTxt}>
                  {` ${addressItem.type == 'P' ? 'Pick-up' : 'Drop'} - ${
                    addressItem.city
                  } (${addressItem.date})`}
                </Text>
              </View>
              {addressIndex < item.addressList.length - 1 && (
                <View
                  style={{
                    borderLeftColor: Colors.PrimaryFirst,
                    borderLeftWidth: 2,
                    borderStyle: 'dashed',
                    height: 35,
                    marginLeft: 10,
                    marginVertical: 2,
                    justifyContent: 'center',
                    paddingLeft: responsiveWidth(5),
                  }}>
                  <Text style={styles.kmTxt}>{'250 Km'}</Text>
                </View>
              )}
            </>
          ))} */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.logoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{`My Loads`}</Text>
        </View>
      </View>

      <View style={styles.InnerContainer}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            paddingTop: responsiveHeight(2),
            paddingBottom: hp(5),
            paddingHorizontal: wp(3),
          }}
          showsVerticalScrollIndicator={false}
          data={loadList}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => <View style={{}} />}
        />
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
    marginTop: 10,
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
});
