import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import appStyle from '../../styles/appStyle';
import Button from '../../components/Button';
import { Logo } from '../../components';
import { animation } from '../../utils/animations';
import { Screen } from '../../constants/screens/screens';
import { Storage } from '../../utils';
import { Key } from '../../constants/Keys';
import { useAuth } from '../../providers/AuthProvider';

const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { logout }: any = useAuth();

  const onPressLogout = async () => {
    try {
      logout()
      navigation.replace(Screen.AuthStack);
    } catch (error) {
      console.log('error:', error)
    }
  };

  return (
    <SafeAreaView style={[appStyle.flex1, appStyle.mh20]}>
      <Logo animationType={animation.slideDown} />
      <ScrollView showsVerticalScrollIndicator={false} >
        <Button containerStyle={styles.button} onPress={onPressLogout}>
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
});
