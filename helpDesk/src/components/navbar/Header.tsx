import React from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';

import {AppIcon, H2, HeaderBackButton, Logo} from '../../components';
import {ColorSet} from '../../styles';
import appStyle from '../../styles/appStyle';
import {FamilySet} from '../../styles/fontFamily';
import {animation} from '../../utils/animations';

interface HeaderProps {
  navigation?: any | undefined;
  backNavigation?: String | undefined;
  subTitle?: String | undefined;
  title?: String | undefined;
  isBackButton?: boolean;
  onPress?: (() => void) | undefined;
  children?: React.ReactNode;
  rightComponent?: React.ReactNode;
  notificationCount?: Number | undefined;
}

const Header: React.FC<HeaderProps> = props => {
  const {navigation, isBackButton, title} = props;

  const backPressHandler = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        appStyle.row,
        appStyle.jcSpaceBetween,
        { paddingVertical: 10},
      ]}>
      <View style={[appStyle.asCenter]}>
        {isBackButton && (
          <HeaderBackButton onPress={() => backPressHandler()} />
        )}
      </View>
      <View>
      {title && <H2>{title}</H2>}
      </View>
      <View style={[appStyle.asCenter]}/>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Header;
