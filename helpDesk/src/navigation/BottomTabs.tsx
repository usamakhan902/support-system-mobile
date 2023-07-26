import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Icons } from '../constants/assets/icons';
import { ColorSet } from '../styles';
import { DashboardScreen, ProfileScreen, AddTicketScreen } from '../screens';
import { Screen } from '../constants/screens/screens';
import { Paragraph } from '../components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getDashboardIcon = (focused: boolean) => {
  return (
    <View style={[styles.tab]}>
      <Image
        style={[
          styles.logoStyle,
          { tintColor: focused ? ColorSet.themeDark : ColorSet.grayMedium },
        ]}
        source={Icons.dashboard}
      />
      <Paragraph
        style={{
          color: focused ? ColorSet.themeDark : ColorSet.grayMedium,
          fontSize: 10,
        }}>
        Dashboard
      </Paragraph>
    </View>
  );
};

const getProfileIcon = (focused: boolean) => {
  return (
    <View style={[styles.tab]}>
      <Image
        style={[
          styles.logoStyle,
          { tintColor: focused ? ColorSet.themeDark : ColorSet.grayMedium },
        ]}
        source={Icons.profile}
      />
      <Paragraph
        style={{
          color: focused ? ColorSet.themeDark : ColorSet.grayMedium,
          fontSize: 10,
        }}>
        Profile
      </Paragraph>
    </View>
  );
};

const DashboardScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.MainStack}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: ColorSet.white,
        },
      }}>
      <Stack.Screen name={Screen.DashboardScreen} component={DashboardScreen} />
      <Stack.Screen name={Screen.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen name={Screen.AddTicketScreen} component={AddTicketScreen} />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screen.MainStack}
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: '700',
        },
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={'MainScreenStack'}
        component={DashboardScreenStack}
        options={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: (route => {
            return styles.tabBar;
          })(route),
          tabBarIcon: ({ focused }) => getDashboardIcon(focused),
        })}
      />
      <Tab.Screen
        name={Screen.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => getProfileIcon(focused),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 3,
  },

  tab: {
    alignItems: 'center',
  },

  tabBar: {
    alignItems: 'center',
    height: 80,

    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default Tabs;
