import React, {useState} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';

function QuateList() {
  const navigation = useNavigation();

  const [quateList, setQuateList] = useState([
    {
      image: Images.imgProfile1,
      name: 'John Doe John (5)',
      msg: 'Hello! How r you? Hello! How r you? Hello! How r you? Hello! How r you?',
      time: '2:35 pm',
    },
    {
      image: Images.imgProfile1,
      name: 'John Doe (5)',
      msg: 'Hello! How r you?',
      time: '2:35 pm',
    },
    {
      image: Images.imgProfile1,
      name: 'John Doe (5)',
      msg: 'Hello! How r you?',
      time: '2:35 pm',
    },
    {
      image: Images.imgProfile1,
      name: 'John Doe John (5)',
      msg: 'Hello! How r you? Hello! How r you? Hello! How r you? Hello! How r you?',
      time: '2:35 pm',
    },
  ]);

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

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('QuatationScreen')}
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
          source={item.image}
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
            {item.name}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              justifyContent: 'center',
              fontSize: normalize(14),
              color: Colors.gray2,
              fontFamily: Fonts.SemiBold,
            }}>
            {item.msg}
          </Text>
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
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.White}
          />
        </TouchableOpacity> */}
        <Text style={styles.headerTxt}>{'Quatation'}</Text>
      </View>
      <View style={styles.InnerContainer}>
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

        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            paddingVertical: hp(3),
            
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
    // marginLeft: responsiveWidth(5),
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
    paddingHorizontal: wp(3),
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
