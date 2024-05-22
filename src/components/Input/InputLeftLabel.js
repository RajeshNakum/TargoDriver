import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Colors} from '../../common/colors';
import {Fonts, normalize} from '../../assets';

const Hint = ({text, visible}) =>
  visible && <Text style={styles.hintText}>{text}</Text>;

const ErrorText = ({error}) =>
  !!error && <Text style={styles.errorText}>{error}</Text>;

const OverlayIcons = ({icons}) =>
  !!icons.length && (
    <View style={styles.iconsOverlay}>
      {icons.map(({icon, onPress, visible}) => (
        <TouchableOpacity
          disabled={!onPress}
          style={styles.iconButton}
          onPress={onPress}>
          {visible && icon}
        </TouchableOpacity>
      ))}
    </View>
  );

const InputLeftLabel = ({
  placeholder,
  value,
  onBlur,
  error,
  onFocus,
  onPressIn,
  inputRef,
  autoFocus,
  maxLength,
  trimOnBlur,
  autoCorrect,
  overlay = [],
  keyboardType,
  onChangeText,
  containerStyle,
  autoCapitalize,
  autoCompleteType,
  editable = true,
  fieldValidationRule,
  inputStyle,
  textContentType = 'none',
  flotingLabel,
  multiline,
  numberOfLines,
  secureTextEntry,
}) => {
  const isPasswordField =
    secureTextEntry || textContentType.toLowerCase().includes('password');

  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const onInputFocus = () => onFocus?.();

  const validateField = () => {
    const isValid = fieldValidationRule(value);

    if (!isValid) {
      setErrorMessage(error || `Please ${placeholder?.toLowerCase()}`);
    }
  };

  const onInputBlur = () => {
    if (trimOnBlur && value) {
      onChangeText(value.trim());
    }

    onBlur?.();
    if (fieldValidationRule) {
      validateField();
    }
  };

  const onChange = text => {
    setErrorMessage(null);
    onChangeText(text);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ErrorText error={errorMessage} />
      <View>
        {flotingLabel ? <Hint text={placeholder} visible={value} /> : null}
        <TextInput
          value={value}
          ref={inputRef}
          placeholder={placeholder}
          editable={editable}
          returnKeyType="done"
          onBlur={onInputBlur}
          autoFocus={autoFocus}
          onPressIn={onPressIn}
          maxLength={maxLength}
          onFocus={onInputFocus}
          onChangeText={onChange}
          allowFontScaling={false}
          importantForAutofill="yes"
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoCompleteType}
          textContentType={textContentType}
          placeholderTextColor={Colors.placeholder}
          secureTextEntry={secureTextEntry}
          multiline={multiline || false}
          numberOfLines={numberOfLines}
          style={[
            styles.input,
            value && flotingLabel ? styles.paddingTop : null,
            {
              borderColor: errorMessage ? Colors.statusRed : Colors.PrimaryDark,
            },
            inputStyle,
          ]}
        />
      </View>
      <OverlayIcons icons={[...overlay]} />
    </View>
  );
};

export default InputLeftLabel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    // flex: 1,
  },
  input: {
    minHeight: 56,
    width: '100%',
    backgroundColor: Colors.White,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: normalize(12),
    fontFamily: Fonts.Roboto_Regular,
    color: Colors.PrimaryDark,
    paddingTop: Platform.OS === 'android' ? 9 : 0,
  },
  paddingTop: {
    paddingTop: Platform.OS === 'android' ? 16 : 10,
  },
  hintText: {
    position: 'absolute',
    zIndex: 1,
    fontSize: normalize(12),
    fontFamily: Fonts.Roboto_Regular,
    left: 16,
    top: 5,
    color: Colors.LightGrey,
  },
  iconsOverlay: {
    position: 'absolute',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    right: 10,
  },
  iconButton: {
    marginLeft: 16,
  },
  errorText: {
    color: Colors.Red,
    marginBottom: 2,
  },
});
