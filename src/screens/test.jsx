import React from 'react';
import { View, TextInput, Image } from 'react-native';

const InputWithIcon = ({ source, placeholder }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Image source={source} style={{ width: 20, height: 20, marginRight: 10 }} />
      <TextInput placeholder={placeholder} style={{ flex: 1 }} />
    </View>
  );
};

export default InputWithIcon;
