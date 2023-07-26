import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  View
} from 'react-native';
import appStyle from '../../styles/appStyle';
import { ListView, Loader } from '../../components/index';
import { H3 } from '../../components';
import { Screen } from '../../constants/screens/screens';
import Header from '../../components/navbar/Header';
import { Icons } from '../../constants/assets/icons';
import { getTicketStatus, getTicketStatusColor } from '../../utils/helpers';
import { getTickets } from '../../networking/DashboardApiService';
import { useFocusEffect } from '@react-navigation/native';
import TicketModel from '../../model/ticket';
import { Paragraph } from 'react-native-paper';
import { screenHeight } from '../../styles/screenSize';

const Dashboard: React.FC<{ navigation: any }> = ({ navigation }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<any[TicketModel]>();

  const onPressAddTicket = () => {
    navigation.navigate(Screen.AddTicketScreen)
  }

  useFocusEffect(
    React.useCallback(() => {
      getAllTickets();
    }, []),
  );

  const getAllTickets = () => {
    getTickets()
      .then(response => {
        setLoading(false)
        if (response?.data?.data?.length) {
          setTickets(response?.data?.data)
        }
      })
      .catch(error => {
        setLoading(false)
        console.log('error:', error);
      });
  };

  return (
    <SafeAreaView style={[appStyle.flex1, appStyle.mh20]}>
      <Header isBackButton={false} navigation={navigation} title={'Dashboard'} />

      <Pressable style={styles.imgContainer} onPress={onPressAddTicket}>
        <H3 style={styles.text}>Add ticket</H3>
        <Image source={Icons.add} style={styles.img} />
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        {tickets?.length > 0 ?
          tickets?.map((item: any, index: number) => {
            return (
              <View key={item?.id}>
                <ListView
                  status={getTicketStatus(item?.status)}
                  title={item?.title}
                  description={item?.description}
                  email={item?.email}
                  statusColor={getTicketStatusColor(item?.status)}
                />
              </View>
            );
          })
          :
          <View style={styles.txtInfo}>
            <Paragraph>No ticket found</Paragraph>
          </View>
        }
      </ScrollView>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  img: {
    height: 35,
    width: 35,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: { alignSelf: 'center' },
  txtInfo: {
    alignItems: 'center',
    marginTop: screenHeight.height30
  }
});
