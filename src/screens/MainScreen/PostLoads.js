import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {
  keyboards,
  responsiveHeight,
  responsiveWidth,
} from '../../common/GConstants';
import {ThemeButton} from '../../components/Button/themeButton';
import {isMobile, notEmptyString} from '../../utils/validation';
import {useNavigation} from '@react-navigation/native';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import Icon from '../../components/Other/Icon';
import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import { Dropdown } from 'react-native-element-dropdown';

function PostLoads() {
  const navigation = useNavigation();

  const [loadName, setLoadName] = useState('');
  const [loadNameError, setLoadNameError] = useState(false);

  const [loadList, setLoadList] = useState([
    {
      id: 1,
      label: 'Light',
      value: 'Light',
    },
    {
      id: 1,
      label: 'Medium',
      value: 'Medium',
    },
    {
      id: 1,
      label: 'Heavy',
      value: 'Heavy',
    },
  ]);
  const [loadvalue, setLoadValue] = useState('');
  const [loadWeight, setLoadWeight] = useState('');
  const [priceType, setPriceType] = useState('');
  const [priceTypeList, setPriceTypeList] = useState([
    {
      id: 1,
      label: 'Fix Price',
      value: 'Fix',
    },
    {
      id: 1,
      label: 'Per Ton',
      value: 'PerTon',
    },
  ]);

  const [weightType, setWeightType] = useState([
    {
      id: 1,
      label: 'Kg',
      value: 'Kg',
    },
    {
      id: 1,
      label: 'Ton',
      value: 'Ton',
    },
  ]);
  const [fixPrice, setFixPrice] = useState('');
  const [addressModal, setAddressModal] = useState(false);
  const [address, setAddress] = useState('');

  const [cityList, setCityList] = useState([
    {
      id: 1,
      label: 'Rajkot',
      value: 'rjt',
    },
    {
      id: 1,
      label: 'Ahmedabad',
      value: 'ahmbd',
    },
  ]);
  const [city, setCity] = useState('');

  const [stateList, setStateList] = useState([
    {
      id: 1,
      label: 'UttarPradesh',
      value: 'up',
    },
    {
      id: 1,
      label: 'Gujrat',
      value: 'gj',
    },
  ]);
  const [state, setState] = useState('');

  const handleEditAddress = () => {};

  const handleDeleteAddress = () => {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.White}
          />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{'Post Load'}</Text>
      </View>
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="always">
          <Text style={styles.label}>{'Load Name'}</Text>
          <InputLeftLabel
            autoCapitalize="none"
            error={loadNameError}
            placeholder={'Enter your Load Name'}
            // textContentType="emailAddress"
            value={loadName}
            onChangeText={value => {
              setLoadName(value);
              setLoadNameError(null);
            }}
            fieldValidationRule={notEmptyString}
          />

          <Text style={styles.label}>{'Load Type'}</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={weightType}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={'Select Load Type'}
            searchPlaceholder="Search..."
            value={loadvalue}
            onChange={item => {
              setLoadValue(item.value);
              // setIsFocus(false);
            }}
            itemTextStyle={{color: Colors.PrimaryFirst}}
            selectedTextStyle={{color: Colors.PrimaryDark}}
          />

          <Text style={styles.label}>{'Load Weight (Approx)'}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <InputLeftLabel
              autoCapitalize="none"
              placeholder={'Enter your Load Weight'}
              value={loadName}
              onChangeText={value => {
                setLoadName(value);
                setLoadNameError(null);
              }}
              //   fieldValidationRule={notEmptyString}
              containerStyle={{width: '73%'}}
            />
            <Dropdown
              style={[styles.dropdown, {width: '25%', marginTop: 0}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={weightType}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Weight'}
              searchPlaceholder="Search..."
              value={loadWeight}
              onChange={item => {
                setLoadWeight(item.value);
                // setIsFocus(false);
              }}
              itemTextStyle={{color: Colors.PrimaryFirst}}
              selectedTextStyle={{color: Colors.PrimaryDark}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: responsiveHeight(1),
            }}>
            <Text style={styles.label}>{'Pick Up Location'}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PrimaryFirst,
                padding: 8,
                borderRadius: 50,
                flexDirection: 'row',
                paddingHorizontal: 15,
              }}
              onPress={() => setAddressModal(true)}>
              <Icon
                type={'Feather'}
                name={'plus'}
                size={18}
                color={Colors.White}
              />
              <Text style={styles.addNewTxt}>Add New</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickupContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Text style={styles.addressTxt}>
                Addres : cysbn dcjbsd vsjbhdv vjdsbvdsj vsdjsjbv vjdbvsd v -
                222223232
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.iconBlueBg}
                  onPress={() => handleEditAddress()}>
                  <Icon
                    type={'Feather'}
                    name={'edit'}
                    size={25}
                    color={Colors.PrimaryFirst}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconRedBg}
                  onPress={() => handleDeleteAddress()}>
                  <Icon
                    type={'FontAwesome'}
                    name={'trash-o'}
                    size={25}
                    color={Colors.Red}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.cityText}>City : Ahmedabad , Gujrat</Text>

            <Text style={styles.darkBoldTxt}>
              Pickup Date : 20/09/2023 (08:30 AM)
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: responsiveHeight(1),
            }}>
            <Text style={styles.label}>{'Drop Location'}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PrimaryFirst,
                padding: 8,
                borderRadius: 50,
                flexDirection: 'row',
                paddingHorizontal: 15,
              }}
              onPress={() => setAddressModal(true)}>
              <Icon
                type={'Feather'}
                name={'plus'}
                size={18}
                color={Colors.White}
              />
              <Text style={styles.addNewTxt}>Add New</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickupContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Text style={styles.addressTxt}>
                Addres : cysbn dcjbsd vsjbhdv vjdsbvdsj vsdjsjbv vjdbvsd v -
                222223232
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.iconBlueBg}
                  onPress={() => navigation.goBack()}>
                  <Icon
                    type={'Feather'}
                    name={'edit'}
                    size={25}
                    color={Colors.PrimaryFirst}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconRedBg}
                  onPress={() => navigation.goBack()}>
                  <Icon
                    type={'FontAwesome'}
                    name={'trash-o'}
                    size={25}
                    color={Colors.Red}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.cityText}>City : Ahmedabad , Gujrat</Text>

            <Text style={styles.darkBoldTxt}>
              Pickup Date : 20/09/2023 (08:30 AM)
            </Text>
          </View>

          <Text style={styles.label}>{'Price Type'}</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={priceTypeList}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={'Select Price Type'}
            searchPlaceholder="Search..."
            value={priceType}
            onChange={item => {
              setPriceType(item.value);
            }}
            itemTextStyle={{color: Colors.PrimaryFirst}}
            selectedTextStyle={{color: Colors.PrimaryDark}}
          />

          {priceType == 'Fix' && (
            <>
              <Text style={styles.label}>{'Fix Price'}</Text>
              <InputLeftLabel
                autoCapitalize="none"
                placeholder={'Enter your Fix Price'}
                // textContentType="emailAddress"
                value={fixPrice}
                onChangeText={value => {
                  setFixPrice(value);
                }}
                keyboardType={keyboards.numeric}
              />
            </>
          )}

          {priceType == 'PerTon' && (
            <>
              <Text style={styles.label}>{'Top Price'}</Text>
              <InputLeftLabel
                autoCapitalize="none"
                placeholder={'Enter your Ton Price'}
                // textContentType="emailAddress"
                value={fixPrice}
                onChangeText={value => {
                  setFixPrice(value);
                }}
                keyboardType={keyboards.numeric}
              />
            </>
          )}

          <ThemeButton
            title={`Continue`}
            style={styles.continueButton}
            styleText={{
              color: Colors.White,
              fontFamily: Fonts.DM_Bold,
            }}
            action={() => {
              navigation.goBack();
            }}
            disabled={false}
          />
        </KeyboardAwareScrollView>
      </View>

      <Modal
        visible={addressModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAddressModal(false)}>
        <Pressable
          style={styles.modalContainer}
          onPress={(event: any) => {
            if (event.target == event.currentTarget) {
              setAddressModal(false);
            }
          }}>
          <View style={[styles.modalContent, {width: responsiveWidth(90)}]}>
            <Text
              style={[
                styles.modalHeader,
                {marginTop: responsiveHeight(2)},
              ]}>{`Add Pickup Address`}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View style={{width: '49%'}}>
                <Text style={styles.label}>{'State'}</Text>
                <Dropdown
                  style={[styles.dropdown, {width: '100%', marginTop: 10}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={stateList}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select State'}
                  searchPlaceholder="Search..."
                  value={state}
                  onChange={item => {
                    setState(item.value);
                    // setIsFocus(false);
                  }}
                  itemTextStyle={{color: Colors.PrimaryFirst}}
                  selectedTextStyle={{color: Colors.PrimaryDark}}
                />
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.label}>{'City'}</Text>
                <Dropdown
                  style={[styles.dropdown, {width: '100%', marginTop: 10}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={cityList}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select City'}
                  searchPlaceholder="Search..."
                  value={city}
                  onChange={item => {
                    setCity(item.value);
                    // setIsFocus(false);
                  }}
                  itemTextStyle={{color: Colors.PrimaryFirst}}
                  selectedTextStyle={{color: Colors.PrimaryDark}}
                />
              </View>
            </View>
            <Text style={styles.label}>{'Address'}</Text>
            <InputLeftLabel
              autoCapitalize="none"
              placeholder={'Enter your Load Name'}
              // textContentType="emailAddress"
              value={address}
              onChangeText={value => {
                setAddress(value);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '49%'}}>
                <Text style={styles.label}>{'Pickup Date'}</Text>
                <TouchableOpacity
                  style={{
                    height: 50,
                    borderRadius: 8,
                    borderColor: Colors.PrimaryFirst,
                    borderWidth: 1,
                    marginTop: 5,
                    justifyContent: 'center',
                    padding: responsiveWidth(3),
                  }}>
                  <Text style={styles.dateTxt}>{'29/01/2023'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.label}>{'Pickup Time'}</Text>
                <TouchableOpacity
                  style={{
                    height: 50,
                    borderRadius: 8,
                    borderColor: Colors.PrimaryFirst,
                    borderWidth: 1,
                    marginTop: 5,
                    justifyContent: 'center',
                    padding: responsiveWidth(3),
                  }}>
                  <Text style={styles.dateTxt}>{'20:30 AM'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ThemeButton
              title={`Continue`}
              style={styles.continueButton}
              styleText={{
                color: Colors.White,
                fontFamily: Fonts.DM_SemiBold,
              }}
              action={() => {
                setAddressModal(false);
              }}
              disabled={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
export default PostLoads;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    // paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    height: 80,
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
  headerSubTitle: {
    color: Colors.LightGrey,
    fontFamily: Fonts.Regular,
    fontSize: normalize(15),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  headerBlueTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(26),
    textAlign: 'center',
    // marginTop: responsiveHeight(5),
  },
  subTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Medium,
    fontSize: normalize(12),
    // textAlign: 'center',
    marginTop: responsiveHeight(3),
  },
  label: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(14),
    marginTop: responsiveHeight(1),
  },
  innerContainer: {
    backgroundColor: Colors.White,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(3),
  },
  continueButton: {
    // backgroundColor: Colors.White,
    marginTop: responsiveHeight(2),
  },
  bottomTxtContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(5),
    flex: 1,
  },
  alredyTxt: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(14),
    textAlign: 'center',
  },
  signinTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(14),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  dropdown: {
    height: 56,
    width: '100%',
    backgroundColor: Colors.White,
    borderColor: Colors.PrimaryFirst,
    borderWidth: 1,
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkBoldTxt: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(14),
    marginTop: responsiveHeight(0.5),
  },
  addressTxt: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(15),
    marginTop: responsiveHeight(1),
    flex: 1,
  },
  iconRedBg: {
    backgroundColor: Colors.red10,
    height: 35,
    width: 35,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBlueBg: {
    backgroundColor: Colors.PrimaryFirst30,
    height: 35,
    width: 35,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(2),
  },
  cityText: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.SemiBold,
    fontSize: normalize(15),
    marginTop: responsiveHeight(0.5),
    flex: 1,
  },
  pickupContainer: {
    borderColor: Colors.PrimaryFirst,
    borderWidth: 1,
    borderRadius: 10,
    //   alignItems: 'center',
    padding: 10,
    marginTop: responsiveHeight(1),
  },
  addNewTxt: {
    color: Colors.White,
    fontFamily: Fonts.Bold,
    fontSize: normalize(12),
    marginLeft: responsiveWidth(2),
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
    textAlign: 'center',
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
  dateTxt: {
    color: Colors.PrimaryDark,
    fontSize: normalize(14),
    fontFamily: Fonts.DM_Bold,
  },
});
