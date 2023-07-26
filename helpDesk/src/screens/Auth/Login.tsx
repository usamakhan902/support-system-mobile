import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import appStyle from '../../styles/appStyle';
import Button from '../../components/Button';
import { Logo, Input, Loader } from '../../components';
import { animation } from '../../utils/animations';
import { Screen } from '../../constants/screens/screens';
import { isEmailValid, showToast } from '../../utils/helpers';
import { login } from '../../networking/OauthAPIService';
import { useAuth } from '../../providers/AuthProvider';
import { Storage } from '../../utils';
import { Key } from '../../constants/Keys';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {

  const [loading, setloading] = React.useState(false);
  const [email, setEmail] = useState<string>('');
  const { user, saveUser }: any = useAuth();

  useEffect(() => {
    if (user) {
      navigateToMainScreen()
      return;
    }
  }, [user])

  const onPressLogin = async () => {
    if (isLoginFormValid()) {
      setloading(true)
      const params = {
        email: email,
      }
      try {
        const result = await login(params);
        setloading(false)
        if (result !== null) {
          await saveToken(result?.token)
          await saveUser(result?.user);
        }
      } catch (error) {
        setloading(false)
        console.log('error:', error);
      }
    }
  };

  const navigateToMainScreen = () => {
    navigation.replace(Screen.MainStack);
  }

  function isLoginFormValid(): boolean {
    if (email === '') {
      showToast('Email field is required');
      return false;
    }
    if (!isEmailValid(email)) {
      showToast('Email format is not valid');
      return false;
    }
    return true;
  }

  const saveToken = async (token: string) => {
    try {
      await Storage.storeDataToStorage(Key.token, token);
    } catch (error) {
      console.log('error:', error)
    }
  };

  return (
    <SafeAreaView style={[appStyle.flex1, appStyle.mh20]}>
      <Logo animationType={animation.slideDown} />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <Input
          label={'Enter your email'}
          value={email}
          setValue={setEmail}
          disabled={false}
        />

        <Button containerStyle={styles.button} onPress={onPressLogin}>
          Login
        </Button>
      </ScrollView>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
});
