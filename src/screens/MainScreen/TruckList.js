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

const trucks = [
  {
    id: 1,
    truckName: 'TATA Ace ',
  },
  {
    id: 2,
    truckName: 'Eicher ',
  },
  {
    id: 3,
    truckName: 'Ashok Leyland',
  },
  {
    id: 4,
    truckName: 'Mahindra',
  },
  {
    id: 5,
    truckName: 'Ashok Leyland 4220 HG',
  },
];
function TruckList() {
  const navigation = useNavigation();

  const [truckLists, setTrucksLists] = useState();

  useEffect(() => {
    setTrucksLists(trucks);
  }, []);

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PostLoads')}
        style={{
          // backgroundColor: 'red',
          // padding: responsiveWidth(3),
          borderColor: Colors.PrimaryFirst,
          borderWidth: 2,
          borderRadius: 10,
          marginTop: responsiveHeight(2),
          overflow: 'hidden',
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: Colors.PrimaryFirst,
            width: 100,
            height: 150,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.imgTruck1}
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{flex: 1, paddingVertical: 10}}>
          <View
            style={{
              backgroundColor: Colors.PrimaryFirst,
              position: 'absolute',
              height: 20,
              width: 80,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              right: 5,
              top: 5,
            }}>
            <Text style={styles.verifyTxt}>{'VERIFIED'}</Text>
          </View>
          <Text style={styles.label}>{item.truckName}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: responsiveWidth(2),
                backgroundColor: Colors.PrimaryFirst,
                borderRadius: 100,
                marginTop: 5,
                marginLeft: 5,
              }}>
              <Icon
                type={'FontAwesome5'}
                name={'truck'}
                size={12}
                color={Colors.White}
              />
              <Text style={styles.weightTxt}>{'Heavy Open Body'}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: responsiveWidth(2),
                backgroundColor: Colors.PrimaryFirst,
                borderRadius: 100,
                marginTop: 5,
                marginLeft: 5,
              }}>
              <Icon
                type={'FontAwesome5'}
                name={'weight-hanging'}
                size={12}
                color={Colors.White}
              />
              <Text style={styles.weightTxt}>{'Upto 32 Tonn'}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: responsiveWidth(2),
                backgroundColor: Colors.PrimaryFirst,
                borderRadius: 100,
                marginTop: 5,
                marginLeft: 5,
              }}>
              <Icon
                type={'FontAwesome5'}
                name={'weight-hanging'}
                size={12}
                color={Colors.White}
              />
              <Text style={styles.weightTxt}>{'7L x 4.8W x 4.8H (ft)'}</Text>
            </View>
          </View>
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
        <Text style={styles.headerTxt}>{'Trucks'}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            paddingTop: hp(2),
            paddingBottom: hp(3),
            paddingHorizontal: wp(3),
          }}
          showsVerticalScrollIndicator={false}
          data={truckLists}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => <View style={{}} />}
        />
      </View>
    </SafeAreaView>
  );
}
export default TruckList;

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
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(18),
    marginLeft: responsiveWidth(5),
    // textAlign: 'center',
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
    fontSize: normalize(18),
    fontFamily: Fonts.ExtraBold,
    color: Colors.PrimaryFirst,
    marginVertical: 10,
    marginLeft: 5,
  },
  weightTxt: {
    fontSize: normalize(10),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
    marginLeft: responsiveWidth(3),
  },
  verifyTxt: {
    fontSize: normalize(10),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
  },
});
