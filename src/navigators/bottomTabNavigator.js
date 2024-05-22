import React from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {actionCreators} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Screen from '../screens';
// import {Icon} from '../assets/Icon';
import {Colors} from '../common/colors';
import Icon from '../components/Other/Icon';
import {Fonts, normalize} from '../assets';

const BottomTab = createBottomTabNavigator();
let selectedIndex = 0;

const MyTabBar = props => {
  return (
    <View
      style={{
        backgroundColor: Colors.White,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        elevation: 15,
      }}>
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        {props.tabValue.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                selectedIndex = index;
                item.screen && props.navigation.navigate(item.screen);
              }}
              style={{alignItems: 'center', width: '25%'}}>
              <Icon
                type={item.iconType}
                name={item.icon}
                size={25}
                color={
                  selectedIndex == index
                    ? Colors.PrimaryFirst
                    : Colors.LightGrey1
                }
              />
              <Text
                style={{
                  fontFamily: Fonts.DM_SemiBold,
                  color:
                    selectedIndex == index
                      ? Colors.PrimaryFirst
                      : Colors.LightGrey1,
                  fontSize: normalize(12),
                  marginTop: 5,
                }}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

class bottomTabNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: [
        {
          icon: 'calendar',
          iconType: 'Ionicons',
          text: 'My Booking',
          screen: 'MyBooking',
        },
        {
          icon: 'truck-fast',
          iconType: 'FontAwesome6',
          text: 'Payment',
          screen: 'Payment',
        },
        {
          icon: 'CodeSandbox',
          iconType: 'AntDesign',
          text: 'Loads',
          screen: 'MyLoads',
        },
        {
          icon: 'user-circle',
          iconType: 'FontAwesome',
          text: 'My Account',
          screen: 'MyAccount',
        },
      ],
    };
  }

  _addScreen(name) {
    return <BottomTab.Screen name={name} component={Screen[name]} />;
  }

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            // paddingTop: StatusBar.currentHeight,
            backgroundColor: Colors.PrimaryFirst,
          }}>
          <BottomTab.Navigator
            tabBar={props => {
              var tabValue = {...props, ...this.state};
              return <MyTabBar {...tabValue} />;
            }}
            sceneContainerStyle={{paddingBottom: '10%'}}
            screenOptions={{
              headerShown: false,
            }}>
            {this._addScreen('MyBooking')}
            {this._addScreen('Payment')}
            {this._addScreen('MyLoads')}
            {this._addScreen('MyAccount')}
          </BottomTab.Navigator>
        </View>
      </>
    );
  }
}
const mapStatetoProps = state => {
  return {};
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);
export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(bottomTabNavigation);
