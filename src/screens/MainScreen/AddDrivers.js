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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ThemeButton} from '../../components/Button/themeButton';

function AddDrivers() {
  const navigation = useNavigation();

  const [drivingLicence, setDerivingLicence] = useState('');
  const [puc, setPuc] = useState('');
  const [rcBook, setRcBook] = useState('');
  const [insurance, setInsurance] = useState({
    fileName: 'Insurance.jpg',
    uri: '',
  });
  const [permit, setPermit] = useState('');
  const [driverName, setDriverName] = useState('');
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

  const selectFile = type => {
    var options = {
      selectionLimit: 1,
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        if (type == 'D') {
          setDerivingLicence(res.assets[0]);
        } else if (type == 'P') {
          setPuc(res.assets[0]);
        } else if (type == 'RC') {
          setRcBook(res.assets[0]);
        } else if (type == 'I') {
          setInsurance(res.assets[0]);
        } else if (type == 'PR') {
          setPermit(res.assets[0]);
        }
      }
    });
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
        <Text style={styles.headerTxt}>{'Add Driver'}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <Text style={styles.headerBlueTxt}>{'Add Driver'}</Text>
          <Text
            style={
              styles.headerSubTitle
            }>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore `}</Text>
          <InputLeftLabel
            autoCapitalize="none"
            placeholder={'Enter Driver Name'}
            value={driverName}
            onChangeText={value => {
              setDriverName(value);
            }}
            inputStyle={[styles.labeltxt, {height: 60, borderWidth: 2}]}
          />

          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={truckList}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={'Select Load Type'}
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

          <TouchableOpacity
            style={styles.documentContainer}
            onPress={() => selectFile('D')}>
            <Text style={styles.labeltxt}>{'Driving licence'}</Text>
            {drivingLicence ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.fileTxt}>{drivingLicence.fileName}</Text>
                <TouchableOpacity onPress={() => setDerivingLicence('')}>
                  <Icon
                    type={'FontAwesome5'}
                    name={'trash'}
                    size={20}
                    color={Colors.Red}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.uploadTxt}>{'Upload  Document'}</Text>
                <Icon
                  type={'FontAwesome5'}
                  name={'file-upload'}
                  size={25}
                  color={Colors.PrimaryFirst}
                />
              </View>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.documentContainer}
            onPress={() => selectFile('P')}>
            <Text style={styles.labeltxt}>{'PUC'}</Text>
            {puc ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.fileTxt}>{puc.fileName}</Text>
                <TouchableOpacity onPress={() => setPuc('')}>
                  <Icon
                    type={'FontAwesome5'}
                    name={'trash'}
                    size={20}
                    color={Colors.Red}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.uploadTxt}>{'Upload  Document'}</Text>
                <Icon
                  type={'FontAwesome5'}
                  name={'file-upload'}
                  size={25}
                  color={Colors.PrimaryFirst}
                />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.documentContainer}
            onPress={() => selectFile('RC')}>
            <Text style={styles.labeltxt}>{'RC Book'}</Text>
            {rcBook ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.fileTxt}>{rcBook.fileName}</Text>
                <TouchableOpacity onPress={() => setRcBook('')}>
                  <Icon
                    type={'FontAwesome5'}
                    name={'trash'}
                    size={20}
                    color={Colors.Red}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.uploadTxt}>{'Upload  Document'}</Text>
                <Icon
                  type={'FontAwesome5'}
                  name={'file-upload'}
                  size={25}
                  color={Colors.PrimaryFirst}
                />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.documentContainer}
            onPress={() => selectFile('I')}>
            <Text style={styles.labeltxt}>{'Insurance'}</Text>
            {insurance ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.fileTxt}>{insurance.fileName}</Text>
                <TouchableOpacity onPress={() => setInsurance('')}>
                  <Icon
                    type={'FontAwesome5'}
                    name={'trash'}
                    size={20}
                    color={Colors.Red}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.uploadTxt}>{'Upload  Document'}</Text>
                <Icon
                  type={'FontAwesome5'}
                  name={'file-upload'}
                  size={25}
                  color={Colors.PrimaryFirst}
                />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.documentContainer}
            onPress={() => selectFile('PR')}>
            <Text style={styles.labeltxt}>{'Permit'}</Text>
            {permit ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.fileTxt}>{permit.fileName}</Text>
                <TouchableOpacity onPress={() => setPermit('')}>
                  <Icon
                    type={'FontAwesome5'}
                    name={'trash'}
                    size={20}
                    color={Colors.Red}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.uploadTxt}>{'Upload  Document'}</Text>
                <Icon
                  type={'FontAwesome5'}
                  name={'file-upload'}
                  size={25}
                  color={Colors.PrimaryFirst}
                />
              </View>
            )}
          </TouchableOpacity> */}
          <ThemeButton
            title={`Submit`}
            style={styles.continueButton}
            styleText={{
              color: Colors.White,
              fontFamily: Fonts.DM_SemiBold,
            }}
            action={() => {
              navigation.goBack();
            }}
            disabled={false}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

export default AddDrivers;

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
    paddingHorizontal: responsiveWidth(5),
  },
  documentContainer: {
    borderColor: Colors.PrimaryFirst,
    borderWidth: 2,
    padding: responsiveWidth(3),
    borderRadius: 10,
    marginTop: responsiveHeight(2),
  },
  labeltxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.Bold,
    color: Colors.PrimaryFirst,
  },
  uploadTxt: {
    fontSize: normalize(14),
    fontFamily: Fonts.SemiBold,
    color: Colors.PrimaryFirst,
  },
  fileTxt: {
    fontSize: normalize(14),
    fontFamily: Fonts.SemiBold,
    color: Colors.LightGrey,
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
  headerBlueTxt: {
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(22),
    textAlign: 'center',
    marginTop: responsiveHeight(2),
  },
  headerSubTitle: {
    color: Colors.LightGrey1,
    fontFamily: Fonts.DM_Medium,
    fontSize: normalize(16),
    textAlign: 'center',
    marginVertical: responsiveHeight(1),
  },
  continueButton: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
});
