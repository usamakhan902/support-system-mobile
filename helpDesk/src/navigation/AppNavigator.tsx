import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Screen} from '../constants/screens/screens';
import {
  LoginScreen,
} from '../screens';

import {ColorSet} from '../styles';
import Tabs from './BottomTabs';
import {navigationRef} from './RootNavigation';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.LoginScreen}
      screenOptions={{
        headerShown: false,
        animation: 'flip',
        gestureEnabled: true,
        presentation: 'card',
        contentStyle: {
          backgroundColor: ColorSet.white,
        },
      }}>
      <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
};

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Screen.AuthStack}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: ColorSet.white,
          },
        }}>
        <Stack.Screen name={Screen.AuthStack} component={Auth} />
        <Stack.Screen name={Screen.MainStack} component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
