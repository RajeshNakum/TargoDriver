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
import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../components/Other/Icon';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {toggleLoader} from '../../config/functions';
import {Method} from '../../Api/APIConstant';
import APIManager from '../../Api/APIManager';

function QuateList(props) {
  const navigation = useNavigation();

  const [quateList, setQuateList] = useState([]);

  useEffect(() => {
    callGetPostloadApi();

    const unsubscribe = navigation.addListener('focus', () => {
      callGetPostloadApi();
    });

    return unsubscribe;
  }, []);

  const callGetPostloadApi = () => {
    toggleLoader(true);

    APIManager.callGetApi(
      `${Method.CHAT_LIST}?load_id=${props.route?.params?.loadId}`,
      {},
      props,
      response => {
        toggleLoader(false);
        console.log('API - response - get Chst list   ==> ', response);
        setQuateList(response.data);
      },
    );
  };

  const _renderItem = ({item}) => {
    console.log('quate item ===>', item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('QuatationScreen', {senderData: item?.sender , loadId : props.route?.params?.loadId})
        }
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: Colors.grey30,
          borderRadius: 10,
          paddingHorizontal: wp(3),
          paddingVertical: hp(1),
          marginVertical: hp(0.5),
        }}>
        <Image
          style={{borderRadius: 50, width: wp(15), aspectRatio: 1}}
          source={Images.imgProfile1}
        />

        <View style={{flex: 1, justifyContent: 'center', marginLeft: wp(3)}}>
          <Text
            numberOfLines={1}
            style={{
              justifyContent: 'center',
              fontSize: normalize(16),
              color: Colors.black,
              fontFamily: Fonts.Bold,
            }}>
            {item?.sender?.name}
            {` (${item.unread_count})`}
          </Text>

          {/* <Text
            numberOfLines={1}
            style={{
              justifyContent: 'center',
              fontSize: normalize(14),
              color: Colors.gray2,
              fontFamily: Fonts.SemiBold,
            }}>
            {item.msg}
          </Text> */}
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: normalize(12),
              color: Colors.viewLineColor,
              fontFamily: Fonts.Regular,
            }}>
            {item.time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.White}
          />
        </TouchableOpacity>
        <Text
          style={styles.headerTxt}>{`Quatation (${quateList.length})`}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            paddingVertical: hp(3),
            paddingHorizontal: wp(3),
          }}
          showsVerticalScrollIndicator={false}
          data={quateList}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => <View style={{}} />}
        />
      </View>
    </SafeAreaView>
  );
}

export default QuateList;

const styles = StyleSheet.create({
  Container: {backgroundColor: Colors.PrimaryFirst, flex: 1},
  RenderItem: {flexDirection: 'row', backgroundColor: Colors.white},
  mainView: {flex: 1},
  headerMain: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    backgroundColor: Colors.PrimaryFirst,
    alignItems: 'center',
    height: 80,
  },
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    // paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    height: 80,
    backgroundColor: Colors.PrimaryFirst,
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
    marginLeft: responsiveWidth(5),
    // textAlign: 'center',
  },
  SubLabel: {
    fontSize: normalize(14),
    fontFamily: Fonts.Regular,
    color: '#71859E',
    textAlign: 'center',
  },
  InnerContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: hp(0.5),
  },
});
