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
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from '../../components/Other/Icon';
import InputLeftLabel from '../../components/Input/InputLeftLabel';
import {ThemeButton} from '../../components/Button/themeButton';
import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {showSuccess, toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';

const HIT_SLOP = {top: 20, bottom: 20, left: 20, right: 20};

function SendFeedback(props) {
  const navigation = useNavigation();

  const [subject, setSubject] = useState('');
  const [discription, setDiscription] = useState('');
  const [discriptionError, setDiscriptionError] = useState(false);

  const validation = () => {
    if (discription == '') {
      setDiscriptionError('Please Enter Feedback.');
      return false;
    }

    callSendFeedBackApi();
  };

  const callSendFeedBackApi = () => {
    toggleLoader(true);
    let params = {
      description: discription,
    };

    APIManager.callPostApi(Method.SEND_FEEDBACK, params, props, response => {
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
        <Text style={styles.headerTxt}>{'Feedback'}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <Text style={styles.inputTitle}>
              {'What would you like to share with us?'}
            </Text>
            <InputLeftLabel
              placeholder={'Write here...'}
              value={discription}
              inputStyle={styles.multilineInputStyle}
              onChangeText={value => {
                setDiscription(value);
                setDiscriptionError(false);
              }}
              error={discriptionError}
              keyboardType="default"
              multiline={true}
              numberOfLines={5}
            />
            <ThemeButton
              title={`Submit`}
              style={styles.button}
              // styleText={{
              //   color: Colors.White,
              //   fontFamily: Fonts.DM_Bold,
              // }}
              action={() => {
                validation();
              }}
              disabled={false}
            />
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
  headerTitle: {
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(18),
    lineHeight: 30,
    justifyContent: 'flex-start',
    color: Colors.PrimaryDark,
    flex: 1,
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
    borderColor: Colors.border2,
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
    color: Colors.PrimaryFirst,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(18),
    marginTop: responsiveHeight(2),
  },
  helpTitleTxt: {
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(16),
    color: Colors.blackDark,
    textAlign: 'center',
    marginHorizontal: responsiveWidth(20),
    marginVertical: responsiveHeight(1),
  },
  blueText: {
    color: Colors.primaryBlue,
  },
  contactTxt: {
    fontFamily: Fonts.Regular,
    color: Colors.greyDark3,
    fontSize: normalize(16),
  },
  emailTxt: {
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.primaryBlue,
    fontSize: normalize(16),
  },
  bottomButtonView: {
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
  },
  multilineInputStyle: {
    textAlignVertical: 'top',
    height: 180,
    paddingTop: responsiveHeight(1),
    marginTop: responsiveHeight(2),
  },
  button: {
    marginVertical: responsiveWidth(2),
  },
});

export default SendFeedback;
