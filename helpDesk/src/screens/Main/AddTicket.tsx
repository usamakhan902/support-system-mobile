import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import appStyle from '../../styles/appStyle';
import Button from '../../components/Button';
import { Input } from '../../components';
import Header from '../../components/navbar/Header';
import Loader from '../../components/loaders/Loader';
import { isEmailValid, showToast } from '../../utils/helpers';
import { submitTicket } from '../../networking/DashboardApiService';
import { useAuth } from '../../providers/AuthProvider';

const isAndroid = Platform.OS === 'android'
console.log('isAndroid',isAndroid)
const AddTicketScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const scrollViewRef: any = useRef(null);
  const { user }: any = useAuth();

  const onPressSubmit = async () => {
    if (isTicketFormValid()) {
      setLoading(true)
      const params = {
        email: email,
        title: title,
        description: description,
        created_by: user?.id
      }
      submitTicket(params)
        .then(response => {
          setLoading(false)
          if (response !== null) {
            showToast(response?.message)
            navigation.goBack()
          }
        })
        .catch(error => {
          setLoading(false)
          console.log('error:', error);
        });
    }
  };


  function isTicketFormValid(): boolean {
    if (title === '') {
      showToast('Title field is required');
      return false;
    }
    if (email === '') {
      showToast('Email field is required');
      return false;
    }
    if (description === '') {
      showToast('Description field is required');
      return false;
    }
    if (!isEmailValid(email)) {
      showToast('Email format is not valid');
      return false;
    }
    return true;
  }

  return (
    <SafeAreaView style={[appStyle.flex1, appStyle.mh20]}>
      <Header navigation={navigation} isBackButton title={'Add Ticket'} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={isAndroid ? undefined : 'padding'}
        keyboardVerticalOffset={0}>

        <ScrollView
          style={{ height: '75%' }}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{ flexGrow: 1 }}>
          <Input
            label={'Enter Title'}
            value={title}
            setValue={setTitle}
          />
          <Input
            label={'Enter Email'}
            value={email}
            setValue={setEmail}
            keyboardType={'email-address'}
          />
          <Input
            label={'Enter Description'}
            value={description}
            setValue={setDescription}
            multiline
            inputStyling={styles.textArea} />

          <Button containerStyle={styles.button} onPress={onPressSubmit}>
            Submit
          </Button>
        </ScrollView>

      </KeyboardAvoidingView>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default AddTicketScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
  textArea: {
    textAlignVertical: 'top',
    height: 150
  }
});
