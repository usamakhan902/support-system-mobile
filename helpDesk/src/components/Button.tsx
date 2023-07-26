import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import {ColorSet, Fonts, FamilySet} from '../styles';
import {Paragraph} from '../components';

interface ButtonProps {
  style?: TextStyle | undefined;
  containerStyle?: ViewStyle | undefined;
  onPress?: (() => void) | undefined;
  icon?: ImageSourcePropType | undefined;
  disable?: boolean;
  children?: string;
}

const Button: React.FC<ButtonProps> = props => {
  const {style, disable, containerStyle, onPress, icon} = props;

  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        {
          ...styles.container,
          ...containerStyle,
        },
        disable ? styles.disabled : null,
      ]}
      onPress={onPress}>
      <Paragraph style={{...styles.label, ...style}}>
        {props.children}
      </Paragraph>
      {icon !== undefined && (
        <Image style={{...styles.image2}} source={icon2} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.0,
    elevation: 4,
    flexDirection: 'row',
    backgroundColor: ColorSet.theme,
    justifyContent: 'center',
  
  },
  disabled: {
    backgroundColor: ColorSet.grayLight,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  label: {
    color: ColorSet.black,
    ...Fonts.size.normal,
    lineHeight: 21,
    fontFamily: FamilySet.regular,
    letterSpacing:2
  },
});

export default Button;
