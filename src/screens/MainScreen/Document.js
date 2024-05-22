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

function Document() {
  const navigation = useNavigation();

  const [drivingLicence, setDerivingLicence] = useState('');
  const [puc, setPuc] = useState('');
  const [rcBook, setRcBook] = useState('');
  const [insurance, setInsurance] = useState('');
  const [permit, setPermit] = useState('');

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
        <Text style={styles.headerTxt}>{'Document'}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <TouchableOpacity
          style={styles.documentContainer}
          onPress={() => selectFile('D')}>
          <Text style={styles.labeltxt}>{'Driving licence'}</Text>
          {console.log('document  === > ', drivingLicence)}
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

        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Document;

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
});
