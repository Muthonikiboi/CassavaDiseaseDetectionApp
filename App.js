import React from "react";
import Signin from "./src/screens/Signin";
import SplashScreen from "./src/screens/splashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUp from "./src/screens/SignUp";

const App =()=>{
  const [isLoading, setIsLoading] = React.useState(true);
  return isLoading ? (
    <SplashScreen setIsLoading={setIsLoading} />
     ) : (
      <NavigationContainer>
        <Signin />
      </NavigationContainer>)

  //   return(
  //   <SafeAreaView style={{flex:1}}>
  //     <SignUp/>
  //   </SafeAreaView>
  // );
}

export default App