import { Key } from '../constants/Keys';
import { showToast } from '../utils/helpers';
import { Status } from './NetworkManager';
import { Alert } from 'react-native';
import * as RootNavigation from '../navigation/RootNavigation';
import { Screen } from '../constants/screens/screens';

export async function responseStatusHandler(result: any) {
  const statusCode = result?.code;

  switch (statusCode) {
    case Status.SUCCESS:
      return result;
    case Status.ERROR:
      Alert.alert('Error', result?.message);
      return null;
    case Status.NOT_FOUND:
      return [];
    case Status.SERVER_ERROR:
      showToast('Internal Server Error');
      return null;
    case Status.AUTHENTICATION_FAIL:
      Alert.alert('Session Expired', 'Your session has been expired.');
      return null;
    default:
      showToast('Network Failed');
      return null;
  }
}
