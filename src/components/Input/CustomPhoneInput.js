import React, {useRef} from 'react';
import {View, TextInput, StyleSheet, Platform, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from '../../common/colors';
import {Fonts} from '../../assets';

const ErrorText = ({error}) =>
  !!error && <Text style={styles.errorText}>{error}</Text>;

const CustomPhoneInput = ({
  data,
  setField,
  placeholder,
  countryCodeStyle,
  phoneInputStyle,
  borderContainerStyle,
  onFocus,
  onPressIn,
  error,
}) => {
  const ref = useRef();

  return (
    <>
      <ErrorText error={error} />
      <View style={[styles.container, borderContainerStyle]}>
        <PhoneInput
          defaultCode={data?.countryCode || 'IN'}
          onChangeCountry={country => {
            setField('countryCode', country.cca2);
            setField('callingCode', `+${country.callingCode[0]}`);
          }}
          containerStyle={[styles.phoneInputContainer, countryCodeStyle]}
          textContainerStyle={styles.phoneInputTextContainer}
          flagButtonStyle={styles.flagButtonStyle}
          codeTextStyle={styles.codeTextStyle}
          layout="second"
          disableArrowIcon
        />
        <TextInput
          ref={ref}
          style={[styles.textInput, phoneInputStyle]}
          placeholder={placeholder}
          // value={data?.phoneNumber ? '' : data}
          value={data?.phoneNumber ? data?.phoneNumber : data}
          onChangeText={text => {
            setField('phoneNumber', text);
          }}
          onFocus={onFocus}
          onPressIn={onPressIn}
          maxLength={10}
          keyboardType="number-pad"
          returnKeyType="done"
        />
      </View>
    </>
  );
};

export default CustomPhoneInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 52,
    marginTop: 5,
    textAlign: 'center',
    backgroundColor: Colors.White,
    paddingLeft: 5,
    borderWidth: 2,
    borderColor: Colors.PrimaryFirst,
    flexDirection: 'row',
    marginVertical: 8,
  },
  phoneInputContainer: {
    width: 60,
  },
  flagButtonStyle: {width: 60},
  phoneInputTextContainer: {
    paddingRight: 0,
    backgroundColor: Colors.White,
    borderLeftColor: Colors.LighBlue,
    borderLeftWidth: 2,
  },
  textInput: {
    width: '100%',
    marginLeft: 15,
    fontSize: 16,
    fontFamily: Fonts.DM_Bold,
  },
  codeTextStyle: {
    fontFamily: Fonts.DM_Bold,
    color: Colors.black,
    fontWeight: Platform.OS === 'android' ? undefined : '700',
    marginRight: 0,
  },
  errorText: {
    color: Colors.Red,
    marginBottom: 2,
  },
});
