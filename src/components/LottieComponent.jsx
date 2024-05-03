import React from "react";
import { View } from "react-native";

const LottieComponent = ({ name, source, path }) => {
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Source: {source}</Text>\
    </View>
  );
}

export default LottieComponent;
