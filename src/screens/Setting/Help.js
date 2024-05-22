import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import {ThemeButton} from '../../components/Button/themeButton';
import Icon from '../../components/Other/Icon';
import {Images} from '../../assets/images';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';
import {showSuccess, toggleLoader} from '../../config/functions';

const templatePath = 'setting.Help';
const HIT_SLOP = {top: 20, bottom: 20, left: 20, right: 20};

function HelpScreen(props) {
  // const {t} = useTranslation();
  const navigation = useNavigation();

  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState(false);

  const [discription, setDiscription] = useState('');
  const [discriptionError, setDiscriptionError] = useState(false);

  const validation = () => {
    if (subject == '') {
      setSubjectError('Please Enter Subject.');
      return false;
    }

    if (discription == '') {
      setDiscriptionError('Please Enter Discription.');
      return false;
    }
    
    callHelpApi();
  };

  const callHelpApi = () => {
    toggleLoader(true);
    let params = {
      title: subject,
      problem_description: discription,
    };

    APIManager.callPostApi(Method.SEND_HELP, params, props, response => {
      toggleLoader(false);
      showSuccess(response.message);
      navigation.goBack();
    });
  };
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
        <Text style={styles.headerTxt}>{'Help'}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View style={styles.cardHeader}>
              {/* <Help /> */}
              <Image
                source={Images.imgHelp}
                resizeMode="contain"
                style={{
                  width: responsiveWidth(25),
                  height: responsiveHeight(15),
                }}
              />
              <Text style={styles.helpTitleTxt}>
                {'Hello, how we can help you?'}
              </Text>
            </View>
            <Text style={styles.inputTitle}>{'Subject'}</Text>
            <InputLeftLabel
              value={subject}
              onChangeText={text => {
                setSubject(text);
                setSubjectError(false);
              }}
              flotingLabel
              placeholder={'Your query title'}
              error={subjectError}
            />
            <Text style={styles.inputTitle}>{'Problem Description'}</Text>
            <InputLeftLabel
              placeholder={'Write here'}
              value={discription}
              inputStyle={styles.multilineInputStyle}
              error={discriptionError}
              onChangeText={value => {
                setDiscription(value);
                setDiscriptionError(false);
              }}
              keyboardType="default"
              multiline={true}
              numberOfLines={5}
            />
            <ThemeButton
              title={`Submit`}
              style={styles.continueButton}
              styleText={{
                color: Colors.White,
                fontFamily: Fonts.DM_Bold,
              }}
              action={() => {
                validation();
              }}
              disabled={false}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.bottomButtonView}>
        <Text style={styles.contactTxt}>{'You can also write us on'}</Text>
        <TouchableOpacity>
          <Text style={styles.emailTxt}>{`contact@targo.com`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    backgroundColor: Colors.PrimaryFirst,
  },
  InnerContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: responsiveHeight(0.5),
  },
  scrollView: {flexGrow: 1, paddingBottom: responsiveHeight(5)},
  container: {
    marginHorizontal: responsiveWidth(5),
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitle: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.familySemiBold,
    fontSize: normalize(16),
    marginTop: responsiveHeight(1),
  },
  helpTitleTxt: {
    fontFamily: Fonts.SemiBold,
    fontSize: normalize(18),
    color: Colors.PrimaryFirst,
    textAlign: 'center',
    marginHorizontal: responsiveWidth(20),
    marginVertical: responsiveHeight(1),
  },
  blueText: {
    color: Colors.primaryBlue,
  },
  contactTxt: {
    fontFamily: Fonts.familyNormal,
    color: Colors.greyDark3,
    fontSize: normalize(16),
  },
  emailTxt: {
    fontFamily: Fonts.familySemiBold,
    color: Colors.primaryBlue,
    fontSize: normalize(16),
  },
  bottomButtonView: {
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  multilineInputStyle: {
    textAlignVertical: 'top',
    height: 180,
    paddingTop: responsiveHeight(1),
  },
  continueButton: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
});

export default HelpScreen;
