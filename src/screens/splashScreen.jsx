import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = ({ setIsLoading }) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require("../../assets/splashScreen.json")} // Replace with your animation source
        autoPlay
        loop={false}
        resizeMode="contain"
        onAnimationFinish={()=> setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Set your desired background color
  },
  animation: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.8,
  },
});

export default SplashScreen;
