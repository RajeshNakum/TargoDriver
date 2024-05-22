import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {Colors} from '../../common/colors';
import {Fonts} from '../../assets';
import {Images} from '../../assets/images';
import {CommonActions, useNavigation} from '@react-navigation/native';
import APISessionManger from '../../Api/APISessionManger';
import {UserType} from '../../Api/APIConstant';

function SplashScreen() {
  const navigation = useNavigation();

  {
    /**
     * Check user is login or not
     * if - true  - redirect to home screen
     * else  - false - redirect to starter screen
     */
  }
  useEffect(() => {
    setTimeout(() => {
      APISessionManger.getUserLogin().then(async res => {
        if (res == true) {
          const userData = await APISessionManger.getUserData();
          console.log('user data ---- > ', userData);
          if (userData.role_id == UserType.TRUCK) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'BottomTabTruck'}],
              }),
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'BottomTab'}],
              }),
            );
          }
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'StarterScreen'}],
            }),
          );
        }
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.splash}>
      <Image
        resizeMode="contain"
        style={styles.logoImage}
        source={Images.imgLogo}
      />
    </View>
  );
}
export default SplashScreen;

const styles = StyleSheet.create({
  splash: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
    flex: 1,
  },
  logoImage: {
    width: '50%',
  },
});
