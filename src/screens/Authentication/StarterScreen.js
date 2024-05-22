import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {Fonts, normalize} from '../../assets';
import {Images} from '../../assets/images';
import {ThemeButton} from '../../components/Button/themeButton';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {Colors} from '../../common/colors';

function StarterScreen() {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={Images.imgSimpleLogo}
        resizeMode="contain"
        style={{
          width: '50%',
          // marginTop: responsiveHeight(10),
        }}
      />
      <View style={styles.bottomTxtView}>
        <View style={styles.imageContainer}>
          <Image
            source={Images.imgStarter}
            resizeMode="contain"
            style={{
              width: '100%',
            }}
          />
        </View>
        <View>
          <Text style={styles.headerBlueTxt}>
            {`India’s Fastest Logistics System`}
          </Text>
          <Text style={styles.subTxt}>
            {
              'Lorem ipsum dolor sit amet, consectetur \nadipiscing elit, sed do eiusmod tempor incididunt '
            }
          </Text>
          <ThemeButton
            title={`Let's Get Started`}
            style={styles.startButton}
            styleText={{
              color: Colors.PrimaryFirst,
              fontFamily: Fonts.DM_Bold,
            }}
            action={() => {
              navigation.navigate('LoginScreen');
            }}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
}
export default StarterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
    paddingHorizontal: responsiveWidth(5),
  },
  bottomTxtView: {
    width: '100%',
    paddingVertical: responsiveHeight(4),
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBlueTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(24),
    textAlign: 'center',
  },
  subTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Medium,
    fontSize: normalize(12),
    textAlign: 'center',
    marginTop: responsiveHeight(3),
  },
  bottomTxtContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signinTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(14),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  startButton: {
    borderRadius: 50,
    marginVertical: responsiveHeight(1.5),
    backgroundColor: Colors.White,
    marginTop: responsiveHeight(5),
  },
});
