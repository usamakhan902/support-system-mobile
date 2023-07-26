import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Layout, Logo, Paragraph} from '../../components';
import {ColorSet} from '../../styles';
import appStyle from '../../styles/appStyle';
import {Screen} from '../../constants/screens/screens';
import {animation} from '../../utils/animations';
import Loader from '../../components/loaders/Loader';
import {Key} from '../../constants/Keys';
import {removeDataFromStorage} from '../../utils/storage';

const LogoutScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      logout();
  }, []);

  const logout = async () => {
    try {
      await removeDataFromStorage(Key.user);
      await removeDataFromStorage(Key.token);
      navigation.replace(Screen.AuthStack);
    } catch (error) {
      console.log('error:', error);
    }
  };
  return (
    <Layout>
      <Loader message={"Logging out"} isLoading={isLoading} layout={'outside'} />
    </Layout>
  );
};

export default LogoutScreen;
