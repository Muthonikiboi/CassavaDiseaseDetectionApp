import React, { useEffect, useState } from "react";
import SplashScreen from "./src/screens/splashScreen";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/screens/SignUp";
import Signin from "./src/screens/Signin"; 
import PasswordReset from "./src/screens/PasswordReset";
import ForgetPassword from  "./src/screens/ForgetPassword";
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet} from "react-native";

const App = () => {
  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout); // Clear timeout if component unmounts before timeout
  }, []);

  return isLoading ? (
    <SplashScreen setIsLoading={setIsLoading} />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ 
        headerShown:false,
      }}
      >
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="SignIn" component={Signin}/>
        <Stack.Screen name="PasswordReset" component={PasswordReset}/>
        <Stack.Screen name="forgetPassword" component={ForgetPassword}/>
        {/* <Stack.Screen name="MosaicDescription" component={MosaicDescription}/>
        <Stack.Screen name="BlightDecription" component={BlightDescription}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  
  // return(
  //   <SafeAreaView style={styles.container}>
  //     {/* <ForgetPassword/> */}
  //     <MosaicDescription/>
  //   </SafeAreaView>
  // )
};

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})

export default App;