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
import {useEffect} from 'react';
import Icon from '../../components/Other/Icon';
import {Colors} from '../../common/colors';
import {responsiveHeight, responsiveWidth} from '../../common/GConstants';
import {Fonts, normalize} from '../../assets';
import {toggleLoader} from '../../config/functions';
import APIManager from '../../Api/APIManager';
import {Method} from '../../Api/APIConstant';

// const templatePath = 'setting.faq';
const HIT_SLOP = {top: 20, bottom: 20, left: 20, right: 20};

const QuestionList = [
  {
    id: 1,
    question: 'What kind of business are you?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus sit amet metus a pellentesque. Praesent vitae lacus risus. Nunc sit amet orci vitae nisl luctus lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla iaculis ex in lacinia mollis. Sed eget dui non felis laoreet pharetra.',
    isActive: true,
  },
  {
    id: 2,
    question: 'Where are you based, and what are your opening hours?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus sit amet metus a pellentesque. Praesent vitae lacus risus. Nunc sit amet orci vitae nisl luctus lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla iaculis ex in lacinia mollis. Sed eget dui non felis laoreet pharetra.',
    isActive: false,
  },
  {
    id: 3,
    question: 'Are you open to everybody, or are you trade only?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus sit amet metus a pellentesque. Praesent vitae lacus risus. Nunc sit amet orci vitae nisl luctus lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla iaculis ex in lacinia mollis. Sed eget dui non felis laoreet pharetra.',
    isActive: false,
  },
  {
    id: 4,
    question: 'Why don’t you do online or mail order sales?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus sit amet metus a pellentesque. Praesent vitae lacus risus. Nunc sit amet orci vitae nisl luctus lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla iaculis ex in lacinia mollis. Sed eget dui non felis laoreet pharetra.',
    isActive: false,
  },
  {
    id: 5,
    question: 'Are your products available anywhere else?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus sit amet metus a pellentesque. Praesent vitae lacus risus. Nunc sit amet orci vitae nisl luctus lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla iaculis ex in lacinia mollis. Sed eget dui non felis laoreet pharetra.',
    isActive: false,
  },
  {
    id: 6,
    question: 'Why is your stuff better?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus sit amet metus a pellentesque. Praesent vitae lacus risus. Nunc sit amet orci vitae nisl luctus lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla iaculis ex in lacinia mollis. Sed eget dui non felis laoreet pharetra.',
    isActive: false,
  },
  {
    id: 7,
    question: 'Are you expensive?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus sit amet metus a pellentesque. Praesent vitae lacus risus. Nunc sit amet orci vitae nisl luctus lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla iaculis ex in lacinia mollis. Sed eget dui non felis laoreet pharetra.',
    isActive: false,
  },
  {
    id: 8,
    question: 'Are the photographs here all the jobs you’ve ever done?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus sit amet metus a pellentesque. Praesent vitae lacus risus. Nunc sit amet orci vitae nisl luctus lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla iaculis ex in lacinia mollis. Sed eget dui non felis laoreet pharetra.',
    isActive: false,
  },
];

function FAQs(props) {
  const navigation = useNavigation();

  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    callGetfaqsApi();
  }, []);

  const callGetfaqsApi = () => {
    toggleLoader(true);

    let params = {};

    APIManager.callGetApi(Method.GET_FAQ, params, props, response => {
      toggleLoader(false);
      console.log('API - response - get banners   ==> ', response);
    });
  };

  const onPressQuestion = id => {
    let tempArr = questionList;
    let tempList = tempArr.map(item => {
      if (item.id == id) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    setQuestionList(tempList);
  };

  useEffect(() => {
    setQuestionList(QuestionList);
  }, []);

  const renderQuestion = item => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => onPressQuestion(item.id)}>
          <Text style={styles.questionTxt}>{item?.question}</Text>
          {item.isActive ? (
            <Icon
              type="FontAwesome"
              name="angle-up"
              size={18}
              color={Colors.PrimaryFirst}
            />
          ) : (
            <Icon
              type="FontAwesome"
              name="angle-down"
              size={18}
              color={Colors.PrimaryFirst}
            />
          )}
        </TouchableOpacity>
        {item.isActive && <Text style={styles.answertxt}>{item?.answer}</Text>}
      </View>
    );
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
        <Text style={styles.headerTxt}>{`FAQ's`}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <FlatList
              data={questionList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={<View style={styles.horiziontalLine} />}
              renderItem={({item, index}) => renderQuestion(item, index)}
              keyExtractor={item => item.id}
              contentContainerStyle={{marginTop: responsiveHeight(3)}}
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
    fontFamily: Fonts.DM_SemiBold,
    fontSize: normalize(18),
    color: Colors.PrimaryFirst,
    flex: 1,
  },
  answertxt: {
    fontFamily: Fonts.DM_Regular,
    fontSize: normalize(16),
    color: Colors.greyDark3,
    marginTop: responsiveHeight(1),
    lineHeight: 28,
  },
  horiziontalLine: {
    backgroundColor: Colors.border,
    height: 1,
    marginVertical: responsiveHeight(2),
  },
});

export default FAQs;
