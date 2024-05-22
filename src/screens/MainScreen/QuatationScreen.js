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
import {
  keyboards,
  responsiveHeight,
  responsiveWidth,
} from '../../common/GConstants';
import Icon from '../../components/Other/Icon';
import {useNavigation} from '@react-navigation/native';
import {showSuccess, toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';
import APISessionManger from '../../Api/APISessionManger';
import moment from 'moment';

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

  const [userData, setUserData] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const [cahtDetails, setChatDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      let userdata = await APISessionManger.getUserData();
      setUserData(userdata);
      callGetMessageList(userdata.id);
    }
    fetchData();
  }, []);

  const callGetMessageList = userid => {
    toggleLoader(true);

    APIManager.callGetApi(
      `${Method.CHAT_VIEW}?load_id=${props.route?.params?.loadId}&receiver_id=${props.route.params.recieverId}&sender_id=${userid}`,
      {},
      props,
      response => {
        toggleLoader(false);
        console.log(
          'API - response - get chat mssage   ==> ',
          JSON.stringify(response),
        );
        setChatDetails(response.data);
        setMessageList(response.data.response);
      },
    );
  };

  const acceptRejectLoad = (status, loadId, finalAmount, driverId) => {
    let params = {
      load_id: loadId,
      action: status,
      driver_id: driverId,
      final_amount: finalAmount,
    };

    toggleLoader(true);

    APIManager.callPostApi(
      `${Method.LOAD_ACCEPT_REJECT_ACTION}`,
      params,
      props,
      response => {
        toggleLoader(false);
        console.log(
          'API - response - get chat mssage   ==> ',
          JSON.stringify(response),
        );
        showSuccess(response.message)
        navigation.goBack()
      },
    );
  };

  const _renderItem = ({item}) => {
    if (userData.id != item.sender_id) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginVertical: hp(0.2),
          }}>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PrimaryFirst,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: responsiveWidth(18),
              }}>
              <Text
                style={{
                  color: Colors.White,
                  fontFamily: Fonts.SemiBold,
                  fontSize: normalize(12),
                }}>
                Accept
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.White,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: Colors.PrimaryFirst,
                marginLeft: responsiveWidth(2),
                width: responsiveWidth(18),
              }}>
              <Text
                style={{
                  color: Colors.PrimaryFirst,
                  fontFamily: Fonts.SemiBold,
                  fontSize: normalize(12),
                }}>
                Reject
              </Text>
            </TouchableOpacity>
          </View> */}
          <View>
            <View style={styles.messageSendContainer}>
              <Text style={styles.messageTxt}>{item.message}</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                maxWidth: wp(70),
              }}>
              <Text
                style={{
                  fontSize: normalize(13),
                  color: Colors.PrimaryFirst30,
                  fontFamily: Fonts.SemiBold,
                  marginRight: wp(1),
                }}>
                {moment(item.updated_at).format('DD MMM YYYY , hh:mm a')}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: hp(0.2),
          }}>
          <View>
            <View style={styles.messageRecieveConatiner}>
              <Text style={styles.messageTxt}>{item.message}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.recieverTime}>
                {moment(item.updated_at).format('DD MMM YYYY , hh:mm a')}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                acceptRejectLoad(
                  'confirmed',
                  item.load_id,
                  item.message,
                  item.receiver_id,
                );
              }}
              style={{
                backgroundColor: Colors.PrimaryFirst,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: responsiveWidth(18),
              }}>
              <Text
                style={{
                  color: Colors.White,
                  fontFamily: Fonts.SemiBold,
                  fontSize: normalize(12),
                }}>
                Accept
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                acceptRejectLoad(
                  'rejected',
                  item.load_id,
                  item.message,
                  item.receiver_id,
                );
              }}
              style={{
                backgroundColor: Colors.White,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: Colors.PrimaryFirst,
                marginLeft: responsiveWidth(2),
                width: responsiveWidth(18),
              }}>
              <Text
                style={{
                  color: Colors.PrimaryFirst,
                  fontFamily: Fonts.SemiBold,
                  fontSize: normalize(12),
                }}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const sendMessage = () => {
    toggleLoader(true);
    let params = {
      load_id: props.route?.params?.loadId,
      receiver_id: props.route.params.recieverId,
      message: message,
    };

    APIManager.callPostApi(Method.CHAT_ADD, params, props, response => {
      toggleLoader(false);
      showSuccess(response.message);
      setMessage('');
      callGetMessageList(userData.id);
    });
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.headerMain}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.White}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image
              source={Images.imgProfile1}
              style={{width: responsiveWidth(10), height: responsiveWidth(10)}}
            /> */}
            <View style={{marginLeft: wp(2)}}>
              <Text
                style={
                  styles.headerText
                }>{`${props.route.params.loadUserDetails.name}`}</Text>
              {/* <Text style={styles.ActiveText}>{`Last seen 22 min ago`}</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingLeft: wp(2)}}
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}>
            {/* <Image
              source={Icon.IcnDots}
              style={{transform: [{rotate: '90deg'}]}}
            /> */}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.messageMainContainer}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{
              paddingVertical: hp(3),
              paddingHorizontal: wp(3),
            }}
            showsVerticalScrollIndicator={false}
            data={messageList}
            renderItem={_renderItem}
            ItemSeparatorComponent={() => <View style={{}} />}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.messageContainer}>
        <InputLeftLabel
          autoCapitalize="none"
          placeholder={'Message...'}
          // textContentType="emailAddress"
          value={message}
          onChangeText={value => {
            setMessage(value);
          }}
          keyboardType={keyboards.numeric}
          containerStyle={{width: '75%'}}
          editable={cahtDetails.sender_message_count >= 3 ? false : true}
        />
        <TouchableOpacity
          style={[
            styles.sendBtn,
            {opacity: cahtDetails.sender_message_count >= 3 ? 0.5 : 1},
          ]}
          disabled={cahtDetails.sender_message_count >= 3 ? true : false}
          onPress={() => sendMessage()}>
          <Text style={{color: Colors.White}}>{`Send`}</Text>
        </TouchableOpacity>
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
  ActiveText: {
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
    fontWeight: '600',
    color: Colors.White,
    textAlign: 'left',
  },
  SubLabel: {
    fontSize: normalize(14),
    fontFamily: Fonts.Regular,
    color: '#71859E',
    textAlign: 'center',
  },
  messageMainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: hp(0.5),
  },
  messageContainer: {
    backgroundColor: Colors.White,
    borderTopColor: Colors.grey30,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sendBtn: {
    backgroundColor: Colors.PrimaryFirst,
    width: '23%',
    // height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 56,
  },

  messageSendContainer: {
    backgroundColor: Colors.PrimaryFirst30,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginVertical: hp(0.5),
    maxWidth: wp(70),
  },
  messageTxt: {
    justifyContent: 'center',
    fontSize: normalize(15),
    color: Colors.PrimaryDark,
    fontFamily: Fonts.SemiBold,
  },
  messageRecieveConatiner: {
    backgroundColor: Colors.LighBlue,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    marginVertical: hp(0.5),
    maxWidth: wp(70),
  },
  recieverTime: {
    fontSize: normalize(13),
    color: Colors.lightGrey,
    fontFamily: Fonts.SemiBold,
    marginLeft: wp(1),
  },
  timeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxWidth: wp(70),
  },
  recieverMessage: {
    justifyContent: 'center',
    fontSize: normalize(15),
    color: Colors.PrimaryDark,
    fontFamily: Fonts.SemiBold,
  },
});
