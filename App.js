import React from "react";
import SplashScreen from "./src/screens/splashScreen";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/screens/SignUp";
import Signin from "./src/screens/Signin"; 
import { createStackNavigator } from '@react-navigation/stack';

const App = () => {
  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = React.useState(true);
  
  return isLoading ? (
    <SplashScreen setIsLoading={setIsLoading} />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
