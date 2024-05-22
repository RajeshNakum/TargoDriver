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
import Pagination from '../../components/Other/Pagination';
import Icon from '../../components/Other/Icon';
import {showError} from '../../config/functions';

function KYCOne() {
  const navigation = useNavigation();

  const [serviceList, setServiceList] = useState([
    {
      id: 1,
      serviceName: 'Addhar Card',
      isSelected: false,
      docType: 'A',
    },
    {
      id: 2,
      serviceName: 'Pan card',
      isSelected: false,
      docType: 'P',
    },
    {
      id: 3,
      serviceName: 'Driver’s License',
      isSelected: false,
      docType: 'L',
    },
  ]);

  const handleChangeService = itemId => {
    let changeServiceList = serviceList.map(fitem => {
      if (fitem.id == itemId) {
        fitem.isSelected = true;
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
            borderColor: item.isSelected
              ? Colors.PrimaryFirst
              : Colors.LightGrey1,
          },
        ]}
        onPress={() => {
          handleChangeService(item.id);
        }}>
        <Icon
          type={'Ionicons'}
          name={
            item.isSelected ? 'radio-button-on-sharp' : 'radio-button-off-sharp'
          }
          size={25}
          color={item.isSelected ? Colors.PrimaryFirst : Colors.LightGrey}
        />
        <View
          style={{
            marginLeft: responsiveWidth(3),
            flex: 1,
          }}>
          <Text style={[styles.serviceText]}>{item.serviceName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Velidation  - check document type selected or not
  const velidation = () => {
    let selectedDocumentType = serviceList.filter(item => item.isSelected);
    if (selectedDocumentType.length > 0) {
      navigation.navigate('KYCTwo', {
        documentType: selectedDocumentType[0].docType,
      });
    } else {
      showError('Please Select KYC Document Type.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <Icon
            type={'AntDesign'}
            name={'arrowleft'}
            size={25}
            color={Colors.PrimaryFirst}
          />
        </TouchableOpacity>
        <Pagination
          index={1}
          totalCount={[1, 2, 3, 4, 5]}
          ContainerStyle={{marginVertical: responsiveHeight(1)}}
          isCountHide={false}
        />
        <Text style={styles.headerTxt}>{'KYC Verification'}</Text>
        <Text
          style={
            styles.headerSubTitle
          }>{`Select any one of the below documents to perform your KYC`}</Text>
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
      </View>
      <View style={styles.bottomTxtContainer}>
        <ThemeButton
          title={`Continue`}
          style={styles.continueButton}
          styleText={{
            color: Colors.White,
            fontFamily: Fonts.DM_Bold,
          }}
          action={() => {
            velidation();
          }}
          disabled={false}
        />
      </View>
    </View>
  );
}
export default KYCOne;

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
    textAlign: 'center',
  },
  headerSubTitle: {
    color: Colors.White,
    fontFamily: Fonts.Regular,
    fontSize: normalize(15),
    textAlign: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(3),
    paddingBottom: responsiveHeight(2),
    position: 'absolute',
    bottom: 0,
    elevation: 10,
    backgroundColor: Colors.White,
  },
  serviceText: {
    color: Colors.PrimaryDark,
    fontFamily: Fonts.DM_Bold,
    fontSize: normalize(16),
    textTransform: 'uppercase',
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
  backArrow: {
    marginVertical: responsiveHeight(2),
    height: 40,
    width: 40,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
