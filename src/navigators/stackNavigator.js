import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNav from './bottomTabNavigator';
import BottomTabNavTruck from './bottomTabNavigatorTruck';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as Screen from '../screens';

const Stack = createNativeStackNavigator();

export class StackNavigator extends React.Component {
  _addScreen(name) {
    return <Stack.Screen name={name} component={Screen[name]} />;
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            title: '',
            headerLeft: null,
            headerBackVisible: false,
          }}>
          {this._addScreen('SplashScreen')}
          {this._addScreen('StarterScreen')}
          {this._addScreen('LoginScreen')}
          {this._addScreen('VerifyOTPScreen')}
          {this._addScreen('SignupScreen')}
          {this._addScreen('SelectService')}
          {this._addScreen('EditProfile')}
          {this._addScreen('MyTransaction')}

          <Stack.Screen name={'BottomTab'} component={BottomTabNav} />
          <Stack.Screen name={'BottomTabTruck'} component={BottomTabNavTruck} />

          {this._addScreen('KYCOne')}
          {this._addScreen('KYCTwo')}
          {this._addScreen('KYCThree')}
          {this._addScreen('KYCFour')}
          {this._addScreen('KYCFive')}

          {this._addScreen('PostLoads')}
          {this._addScreen('QuateList')}
          {this._addScreen('QuatationScreen')}
          {this._addScreen('TruckList')}
          {this._addScreen('TrackLoad')}
          {this._addScreen('Document')}
          
          {this._addScreen('AddTruck')}
          {this._addScreen('AddDrivers')}
          {this._addScreen('TruckBooking')}

          {this._addScreen('Help')}
          {this._addScreen('PrivacyPolicy')}
          {this._addScreen('FAQs')}
          {this._addScreen('SendFeedback')}
          {this._addScreen('Notification')}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
