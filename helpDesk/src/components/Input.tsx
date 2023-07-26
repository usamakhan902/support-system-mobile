import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardTypeOptions,
  Text,
  ImageSourcePropType,
  TextInput,
  ViewStyle,
} from 'react-native';
import {ColorSet, Fonts, FamilySet} from '../styles';

interface InputChatProps {
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: Function;
  onEditingEndHandler?: Function;
  setValue: Function;
  autofocus?: boolean;
  editable?: boolean;
  required?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  label?: string;
  title?: string;
  errorText?: string;
  isSecure?: boolean | undefined;
  outlineColor?: string | undefined;
  maxLength?: Number | any;
  inputActiveBg?: string;
  rightIcon?: ImageSourcePropType | undefined;
  isDropdown?: boolean;
  onPressDropdown?: (() => void) | any;
  dropdownOptions?: any;
  inputStyling?: ViewStyle | undefined;
}

const InputChat: React.FC<InputChatProps> = props => {
  const {
    onEditingEndHandler,
    onChangeText,
    keyboardType,
    setValue,
    autofocus,
    label,
    title,
    isSecure,
    value,
    required,
    multiline,
    maxLength,
    inputStyling,
    disabled,
  } = props;
  const [showSecureInput, setShowSecureInput] = useState(true);
  const changeHandler = (inputText: string) => {
    if (onChangeText) onChangeText();
    setValue(inputText);
  };

  const onEditingEnd = () => {
    if (onEditingEndHandler) {
      onEditingEndHandler(value);
    }
  };

  return (
    <View>
      {title && (
        <Text style={styles.title}>
          {title}
          <Text style={{color: ColorSet.red}}>{required ? ' *' : ''}</Text>
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
        ]}>
        <TextInput
          style={[
            styles.input,
            {
              textAlignVertical: 'center',
              ...inputStyling,
            },
          ]}
          placeholderTextColor={ColorSet.grayMedium}
          placeholder={label}
          value={value}
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
          onChangeText={changeHandler}
          keyboardType={keyboardType ?? 'default'}
          autoFocus={autofocus}
          editable={!disabled}
          secureTextEntry={isSecure && showSecureInput}
          maxLength={maxLength}
          onEndEditing={onEditingEnd}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor:ColorSet.grayMedium ,
    backgroundColor: ColorSet.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 4,
    marginTop:20,
  },
  input: {
    width: '100%',
    ...Fonts.size.normal,
    fontFamily: FamilySet.regular,
    color: ColorSet.grayMedium,
    alignItems: 'center',
    alignSelf:'center',
   paddingVertical:10

  },
  title: {
    color: ColorSet.grayMedium,
    ...Fonts.size.medium,
    fontFamily: FamilySet.medium,
  },
});

export default InputChat;
