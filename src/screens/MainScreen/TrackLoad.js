import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
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
import StepIndicator from 'react-native-step-indicator';
import {ThemeButton} from '../../components/Button/themeButton';
import {launchCamera} from 'react-native-image-picker';

function TrackLoad() {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isCameraModal, setIscameraModal] = React.useState(false);
  const [selectedImagedata, setSelectedImageData] = useState(null);

  const onStepPress = position => {
    if (position == 0 || position == 4) {
      setIscameraModal(true);
    }
    setCurrentPage(position);
  };

  const captureImage = () => {
    var options = {
      selectionLimit: 1,
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        // handleCloseModal()
        // props.getImage(res.assets[0].uri, res.assets[0].base64)
        setSelectedImageData(res.assets[0]);
      }
    });
  };
  const stepIndicatorStyles = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: Colors.PrimaryFirst,
    separatorFinishedColor: Colors.PrimaryFirst,
    separatorUnFinishedColor: Colors.border,
    stepIndicatorFinishedColor: Colors.PrimaryFirst,
    stepIndicatorUnFinishedColor: Colors.border,
    stepIndicatorCurrentColor: Colors.White,
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: Colors.PrimaryDark,
    stepIndicatorLabelFinishedColor: Colors.White,
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: Colors.PrimaryFirst,
  };

  const renderViewPagerPage = data => {
    return (
      <View key={data} style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };

  const renderLabel = ({position, label, currentPosition}) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }>
        {label}
      </Text>
    );
  };

  const renderStepIndicator = params => (
    <Icon {...getStepIndicatorIconConfig(params)} />
  );

  const getStepIndicatorIconConfig = ({
    position,
    stepStatus,
  }: {
    position: number,
    stepStatus: string,
  }) => {
    const iconConfig = {
      name: 'feed',
      color: stepStatus === 'finished' ? Colors.White : Colors.PrimaryFirst,
      type: 'FontAwesome6',
      size: 20,
    };
    switch (position) {
      case 0: {
        (iconConfig.type = 'FontAwesome6'), (iconConfig.name = 'location-dot');
        break;
      }
      case 1: {
        (iconConfig.type = 'Feather'), (iconConfig.name = 'codesandbox');
        break;
      }
      case 2: {
        (iconConfig.type = 'AntDesign'), (iconConfig.name = 'creditcard');
        break;
      }
      case 3: {
        (iconConfig.type = 'Ionicons'), (iconConfig.name = 'checkmark-done');
        break;
      }
      case 4: {
        (iconConfig.type = 'Ionicons'), (iconConfig.name = 'checkmark-done');
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
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
        <Text style={styles.headerTxt}>{'Track Load'}</Text>
      </View>
      <View style={styles.InnerContainer}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: responsiveHeight(10),
            paddingHorizontal: responsiveWidth(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: responsiveHeight(2),
            }}>
            <Text style={styles.QuateTxt}>{'Route'}</Text>
            <Text style={styles.kmTxt}>{'384 Kms (Approx)'}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: responsiveHeight(2),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.border,
                width: '45%',
                padding: 10,
                borderRadius: 10,
              }}>
              <Icon
                type={'Ionicons'}
                name={'location'}
                size={25}
                color={Colors.PrimaryFirst}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text style={styles.cityTxt}>{`Monday 25, Apr `}</Text>
                <Text
                  numberOfLines={1}
                  style={styles.addressTxt}>{`Ahmedadbad`}</Text>
              </View>
            </View>
            <Icon
              type={'FontAwesome6'}
              name={'arrow-right'}
              size={25}
              color={Colors.PrimaryFirst}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.border,
                width: '45%',
                padding: 10,
                borderRadius: 10,
              }}>
              <Icon
                type={'Ionicons'}
                name={'location'}
                size={25}
                color={Colors.PrimaryFirst}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text style={styles.cityTxt}>{`Thursday 27, Apr`}</Text>
                <Text
                  numberOfLines={1}
                  style={styles.addressTxt}>{`Ahmedadbad`}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.border,
              // width: '45%',
              padding: 10,
              borderRadius: 10,
              marginTop: responsiveHeight(2),
            }}>
            <Image
              style={{
                borderRadius: 50,
                width: responsiveWidth(15),
                aspectRatio: 1,
              }}
              source={Images.imgProfile1}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginLeft: responsiveWidth(3),
              }}>
              <Text style={styles.profileName}>{`Lokesh G`}</Text>
              <Text
                numberOfLines={1}
                style={styles.addressTxt}>{`Ahmedadbad`}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PrimaryFirst,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <Icon
                type={'Feather'}
                name={'phone-call'}
                size={22}
                color={Colors.White}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('QuatationScreen')}
              style={{
                backgroundColor: Colors.PrimaryFirst,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                marginLeft: responsiveWidth(2),
              }}>
              <Icon
                type={'AntDesign'}
                name={'message1'}
                size={22}
                color={Colors.White}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: Colors.border,
              // width: '45%',
              padding: 10,
              borderRadius: 10,
              marginTop: responsiveHeight(2),
            }}>
            <Text style={styles.kmTxt}>Driver Comments : </Text>
            <Text style={styles.commenttxt}>Toll Gate Traffic Issue</Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginTop: responsiveHeight(2),
              height: responsiveHeight(30),
              backgroundColor: Colors.red10,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              resizeMode={'cover'}
              style={{height: responsiveHeight(30), width: '100%'}}
              source={Images.imgMap}
            />
          </TouchableOpacity>

          <View style={{height: 400}}>
            <StepIndicator
              // customStyles={secondIndicatorStyles}
              currentPosition={currentPage}
              onPress={onStepPress}
              renderStepIndicator={renderStepIndicator}
              labels={[
                'Pick-up (23 Jan, 2024 20:08:25)',
                'Order Summary  (23 Jan, 2024 20:08:25)',
                'Payment Method  (23 Jan, 2024 20:08:25)',
                'Track  (23 Jan, 2024 20:08:25)',
                'Delivered  (23 Jan, 2024 20:08:25)',
              ]}
              direction="vertical"
              customStyles={stepIndicatorStyles}
              stepCount={5}
              renderLabel={renderLabel}
            />
          </View>
          {/* truck details */}
          <View
            style={{
              backgroundColor: Colors.White,
              shadowColor: Colors.PrimaryDark,
              shadowOffset: {width: 1, height: 1},
              shadowRadius: 10,
              elevation: 5,
              marginTop: responsiveHeight(2),
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: Colors.PrimaryFirst,
                width: 100,
                height: 100,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Images.imgTruck1}
                resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={{flex: 1, paddingVertical: 10}}>
              <View
                style={{
                  backgroundColor: Colors.PrimaryFirst,
                  position: 'absolute',
                  height: 20,
                  width: 80,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: 5,
                  top: 5,
                }}>
                <Text style={styles.verifyTxt}>{'Active'}</Text>
              </View>
              <Text style={styles.label}>{'TATA ACE'}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: responsiveWidth(2),
                    backgroundColor: Colors.PrimaryFirst,
                    borderRadius: 100,
                    marginTop: 5,
                    marginLeft: 5,
                  }}>
                  <Text style={styles.featureTxt}>{'GJ XX AB XXXX'}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal
        visible={isCameraModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIscameraModal(false)}>
        <Pressable
          style={styles.modalContainer}
          onPress={event => {
            if (event.target == event.currentTarget) {
              setIscameraModal(false);
            }
          }}>
          <View
            style={[
              styles.modalContent,
              {width: responsiveWidth(80), alignItems: 'center'},
            ]}>
            <Image
              source={Images.imgKyc}
              resizeMode="contain"
              style={{width: responsiveWidth(25), height: responsiveHeight(15)}}
            />
            <Text
              style={[
                styles.modalHeader,
                {marginTop: responsiveHeight(2)},
              ]}>{`Upload Pick-up Photo`}</Text>
            <Text
              style={[
                styles.modalSubText,
              ]}>{`We need to upload photo. Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}</Text>
            {selectedImagedata ? (
              <TouchableOpacity
                // style={styles.uploadPhotoContainer}
                onPress={() => captureImage()}>
                <Image
                  source={{uri: selectedImagedata.uri}}
                  // resizeMode="contain"
                  style={{
                    width: 200,
                    height: 100,
                    marginTop: responsiveHeight(2),
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.uploadPhotoContainer}
                onPress={() => captureImage()}>
                <Icon
                  type={'Entypo'}
                  name={'camera'}
                  size={30}
                  color={Colors.LightGrey}
                />
                <Text
                  style={{
                    color: Colors.Placeholder,
                    fontFamily: Fonts.DM_Regular,
                    fontSize: normalize(16),
                    marginTop: responsiveHeight(2),
                  }}>
                  {'Take Photo'}
                </Text>
              </TouchableOpacity>
            )}
            <ThemeButton
              title={`Upload Photo`}
              style={styles.continueButton}
              styleText={{
                color: Colors.White,
                fontFamily: Fonts.DM_SemiBold,
              }}
              action={() => {
                setIscameraModal(false);
              }}
              disabled={false}
            />
            <ThemeButton
              title={`Close`}
              style={[
                styles.continueButton,
                {backgroundColor: Colors.White, borderWidth: 0},
              ]}
              styleText={{
                color: Colors.PrimaryFirst,
                fontFamily: Fonts.DM_SemiBold,
              }}
              action={() => {
                setIscameraModal(false);
              }}
              disabled={false}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

export default TrackLoad;

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
    // paddingHorizontal: responsiveWidth(5),
  },
  loadNameTxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
  },
  QuateTxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_Bold,
    color: Colors.PrimaryFirst,
  },
  kmTxt: {
    fontSize: normalize(14),
    fontFamily: Fonts.ExtraBold,
    color: Colors.PrimaryFirst,
  },
  commenttxt: {
    fontSize: normalize(14),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.LightGrey,
    // flex: 1,
  },
  label: {
    fontSize: normalize(18),
    fontFamily: Fonts.ExtraBold,
    color: Colors.PrimaryFirst,
    // marginVertical: 10,
    marginLeft: 5,
  },
  weightTxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_Bold,
    color: Colors.White,
  },
  cityTxt: {
    fontSize: normalize(12),
    fontFamily: Fonts.DM_Bold,
    color: Colors.PrimaryFirst,
  },
  addressTxt: {
    fontSize: normalize(14),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.PrimaryFirst,
  },
  deviderView: {
    backgroundColor: Colors.border,
    height: 2,
    marginVertical: responsiveHeight(2),
  },
  driverProfileview: {
    backgroundColor: Colors.border,
    borderRadius: 10,
    padding: responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    fontSize: normalize(18),
    fontFamily: Fonts.DM_Bold,
    color: Colors.PrimaryFirst,
  },
  verifyTxt: {
    fontSize: normalize(10),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
  },
  featureTxt: {
    fontSize: normalize(16),
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.White,
  },
  stepLabel: {
    fontSize: normalize(12),
    color: Colors.lightGrey,
    fontFamily: Fonts.DM_Bold,
    width: '100%',
  },
  stepLabelSelected: {
    fontSize: normalize(14),
    fontFamily: Fonts.DM_Bold,
    color: Colors.PrimaryFirst,
    width: '100%',
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
    // textAlign: 'center',
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
  uploadPhotoContainer: {
    backgroundColor: Colors.White,
    height: responsiveHeight(15),
    width: '100%',
    borderRadius: 10,
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginVertical: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
