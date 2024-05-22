import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {Colors, Fonts} from '../../theme';
// import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {
//   widthPercentageToDP as responsiveWidth,
//   heightPercentageToDP as responsiveHeight,
// } from 'react-native-responsive-screen';
// import Icon from '../../components/Icon';
// import {WhiteButton} from '../../components';
import {useEffect} from 'react';
import Icon from '../../components/Other/Icon';
import {Colors} from '../../common/colors';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {Fonts, normalize} from '../../assets';

// const templatePath = 'setting.privacyPolicyScreen';
const HIT_SLOP = {top: 20, bottom: 20, left: 20, right: 20};

function PrivacyPlicy() {
  // const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.White}
          />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{'Privacy Policy'}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <Text style={styles.answertxt}>
              {
                'At Targo, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide while using our app.'
              }
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryFirst,
  },
  scrollView: {flexGrow: 1, paddingBottom: responsiveHeight(5)},
  
  logoContainer: {
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    // paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    height: 80,
    backgroundColor: Colors.PrimaryFirst,
  },
  InnerContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: responsiveHeight(0.5),
  },
  container: {
    marginHorizontal: responsiveWidth(5),
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    color: Colors.White,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(18),
    marginLeft: responsiveWidth(5),
    // textAlign: 'center',
  },
  leftStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
    position: 'relative',
    zIndex: 1,
    flexShrink: 1,
  },
  iconStyle: {
    marginLeft: responsiveWidth(2),
    width: responsiveWidth(10),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: Colors.border,
  },
  containerPadding: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  planMainContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
  },
  cardContainer: {},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionTxt: {
    fontFamily: Fonts.SemiBold,
    fontSize: normalize(16),
    color: Colors.PrimaryDark,
    flex: 1,
  },
  answertxt: {
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(16),
    color: Colors.LightGrey,
  },
  horiziontalLine: {
    backgroundColor: Colors.border,
    height: 1,
    marginVertical: responsiveHeight(2),
  },
});

export default PrivacyPlicy;
