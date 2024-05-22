import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {ThemeButton} from '../../components/Button/themeButton';

function SelectService() {
  const navigation = useNavigation();

  const [selectedUserType, setSelectedUserType] = useState('');
  const [serviceList, setServiceList] = useState([
    // {
    //   id: 1,
    //   serviceName: 'Shipper',
    //   discription: 'Looking for trucks to transport your load',
    //   isSelected: false,
    //   Image: Images.imgShipper,
    // },
    {
      id: 2,
      serviceName: 'Driver',
      discription: 'You drive a truck to pick-up and deliver loads',
      isSelected: false,
      Image: Images.imgDriver,
      type: 'D',
    },
    {
      id: 3,
      serviceName: 'Truck Owner',
      discription: 'You own multiple trucks and book loads for your trucks',
      isSelected: false,
      Image: Images.imgTruckOwner,
      type: 'T',
    },
  ]);

  const handleChangeService = itemId => {
    let changeServiceList = serviceList.map(fitem => {
      if (fitem.id == itemId) {
        fitem.isSelected = true;
        setSelectedUserType(fitem.type);
      } else {
        fitem.isSelected = false;
      }
      return fitem;
    });

    setServiceList(changeServiceList);
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={[
          styles.serviceContainer,
          {
            backgroundColor: item.isSelected
              ? Colors.PrimaryFirst
              : Colors.White,
          },
        ]}
        onPress={() => {
          handleChangeService(item.id);
        }}>
        <Image
          source={item.Image}
          resizeMode="contain"
          style={{width: 70, height: 70}}
        />
        <View
          style={{
            marginLeft: responsiveWidth(3),
            flex: 1,
          }}>
          <Text
            style={[
              styles.serviceText,
              {
                color: item.isSelected ? Colors.White : Colors.PrimaryFirst,
              },
            ]}>
            {item.serviceName}
          </Text>
          <Text
            style={[
              styles.serviceSubText,
              {
                color: item.isSelected ? Colors.White : Colors.LightGrey,
              },
            ]}>
            {item.discription}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={Images.imgLogo}
        />
        <Text style={styles.headerTxt}>{'Select Service'}</Text>
        <Text
          style={
            styles.headerSubTitle
          }>{`Select the type of services you provide`}</Text>
      </View>
      <View style={styles.innerContainer}>
        <FlatList
          bounces={false}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={{}}
          contentContainerStyle={{
            // paddingHorizontal: responsiveWidth(3),
            paddingTop: responsiveHeight(4),
            paddingBottom: responsiveHeight(10),
          }}
          data={serviceList}
          renderItem={({item, index}) => renderItem(item, index)}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.bottomTxtContainer}>
          <ThemeButton
            title={`Continue`}
            style={styles.continueButton}
            styleText={{
              color: Colors.White,
              fontFamily: Fonts.DM_Bold,
            }}
            action={() => {
              navigation.navigate('SignupScreen', {
                signupType: selectedUserType,
              });
              // if (selectedUserType == 'D') {
              //   navigation.navigate('BottomTab');
              // } else {
              //   navigation.navigate('BottomTabTruck');
              // }
            }}
            // action={() => {}}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
}
export default SelectService;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
  },
  logoImage: {
    width: '50%',
  },
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(26),
    // textAlign: 'center',
  },
  headerSubTitle: {
    color: Colors.White,
    fontFamily: Fonts.Regular,
    fontSize: normalize(15),
    // textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  headerBlueTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(26),
    textAlign: 'center',
    marginTop: responsiveHeight(5),
  },
  subTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Medium,
    fontSize: normalize(12),
    // textAlign: 'center',
    marginTop: responsiveHeight(3),
  },
  label: {
    color: Colors.LightGrey,
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(14),
    marginTop: responsiveHeight(2),
  },
  innerContainer: {
    backgroundColor: Colors.White,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(3),
  },
  continueButton: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
  bottomTxtContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(5),
    flex: 1,
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
    fontSize: normalize(14),
    marginTop: responsiveHeight(1),
  },
  serviceContainer: {
    backgroundColor: Colors.White,
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(2),
    borderColor: Colors.PrimaryFirst,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: responsiveHeight(2),
  },
});
