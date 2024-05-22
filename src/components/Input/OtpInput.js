import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import { Colors } from '../../common/colors';
import { Fonts } from '../../assets';

const CODE_LENGTH = 6;

const OtpInput = ({
  codeLength = CODE_LENGTH,
  onChange = () => null,
  keyboardType,
  autoCap,
}) => {
  const [code, setCode] = useState('');

  const codeDigitsArray = Array.from({length: codeLength}, (_, i) => i); // initialize array

  const ref = useRef();

  // this effect is needed for some android devices that don't respect autofocus prop on TextInput
  useEffect(() => {
    setTimeout(() => {
      if (!ref.current?.isFocused()) {
        ref.current?.focus();
      }
    }, 250);
  }, []);

  const handleOnPress = () => {
    ref.current.blur();
    ref.current?.focus();
  };

  const handleOnChange = newCode => {
    setCode(newCode);
    onChange(newCode);
  };

  const toDigitInput = (_value, idx) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;

    return (
      <View key={idx} style={style.inputContainer}>
        <Text allowFontScaling={false} style={style.inputText}>
          {digit}
        </Text>
      </View>
    );
  };

  return (
    <Pressable style={style.container} onPress={handleOnPress}>
      <View style={style.inputsContainer}>
        {codeDigitsArray.map(toDigitInput)}
      </View>
      <TextInput
        ref={ref}
        onChangeText={handleOnChange}
        keyboardType={keyboardType || 'number-pad'}
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={codeLength}
        style={style.hiddenCodeInput}
        autoCapitalize={autoCap || 'none'}
        autoFocus
      />
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  inputContainer: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
  },

  inputContainerFocused: {
    // borderColor: '#0f5181',
  },
  inputText: {
    fontSize: 16,
    fontFamily: Fonts.DM_SemiBold,
    color: Colors.PrimaryDark,
  },
  hiddenCodeInput: {
    height: 1,
    width: 1,
    opacity: 0,
  },
});

export default OtpInput;
