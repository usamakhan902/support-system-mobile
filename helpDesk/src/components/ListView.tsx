import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorSet, FamilySet } from '../styles';
import Paragraph from './typography/Paragraph';
import appStyle from '../styles/appStyle';

interface ListViewProps {
  title?: string;
  description?: string;
  email?: string;
  status?: string;
  statusColor?: string;
}

const ListView: React.FC<ListViewProps> = props => {
  const { title, description, email, status,statusColor } = props;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Paragraph style={styles.txtTitle}>Name:</Paragraph>
        <Paragraph>{title}</Paragraph>
      </View>

      <View style={styles.textContainer}>
        <Paragraph style={styles.txtTitle}>Email:</Paragraph>
        <Paragraph>{email}</Paragraph>
      </View>

      <View style={styles.textContainer}>
        <Paragraph style={styles.txtTitle}>Status:</Paragraph>
        <View style={[appStyle.row]}>
          <Paragraph>{status}</Paragraph>
          <View style={[styles.status,{backgroundColor:statusColor}]} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Paragraph style={styles.txtTitle}>Description:</Paragraph>
        <Paragraph numberOfLines={6} style={{ flex: 1 }}>{description}</Paragraph>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: ColorSet.grayLight,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: ColorSet.offWhite,
    marginVertical: 10,
  },
  textContainer: {
    marginTop: 10,
  },
  txtTitle: {
    fontFamily: FamilySet.semibold,
  },
  status: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginLeft: 2,
    alignSelf: 'center'
  },
});

export default ListView;
