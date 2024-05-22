import React from 'react';
import {Image, StyleSheet} from 'react-native';

// import {SvgCssUri} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {Colors} from '../../common/colors';

const Icon = ({
  type,
  name,
  localIcon,
  url,
  size,
  color,
  width = 18,
  height = 18,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'MaterialIcons':
        return (
          <MaterialIcons
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'Ionicons':
        return (
          <Ionicons
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'Octicons':
        return (
          <Octicons
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'FontAwesome':
        return (
          <FontAwesome
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'FontAwesome5':
        return (
          <FontAwesome5
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'FontAwesome6':
        return (
          <FontAwesome6
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'AntDesign':
        return (
          <AntDesign
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'Feather':
        return (
          <Feather
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'SimpleLineIcons':
        return (
          <SimpleLineIcons
            name={name}
            size={size}
            color={color || Colors.PrimaryGrey}
          />
        );
      case 'Entypo':
        return (
          <Entypo name={name} size={size} color={color || Colors.PrimaryGrey} />
        );
      case 'url':
        // if (url?.split('.')?.pop() === 'svg') {
        //   return <SvgCssUri width={width} height={height} uri={url} />;
        // }
        return <Image source={{uri: url}} style={styles.icon} />;
      default:
        return localIcon;
    }
  };

  return getIcon();
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
export default Icon;
