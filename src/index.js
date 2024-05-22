import React from 'react';
import {View, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {Provider} from 'react-redux';
import myStore from './reducers';
import {StackNavigator} from './navigators/stackNavigator';
import Loader from './config/Loader';
import FlashMessage from 'react-native-flash-message';
import { setLoaderRef } from './config/functions';

const store = myStore();
export default class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
  }

  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
        <Loader ref={ref => setLoaderRef(ref)} />
        <FlashMessage position="top" />
      </Provider>
    );
  }
}
