import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Icons} from '../../constants/assets/icons';
import { ColorSet } from '../../styles';

interface BackButtonProps {
  onPress: (() => void) | undefined;
}

const HeaderBackButton: React.FC<BackButtonProps> = ({onPress}) => {
  return (
    <View style={[styles.header]}>
      <TouchableOpacity onPress={onPress} >
        <Image style={styles.image} source={Icons.back} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor:ColorSet.black
  },
});

export default HeaderBackButton;
