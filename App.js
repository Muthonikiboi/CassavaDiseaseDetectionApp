import React from "react";
import Signin from "./src/screens/Signin";
import SplashScreen from "./src/screens/splashScreen";
import { NavigationContainer } from "@react-navigation/native";

const App =()=>{
  const [isLoading, setIsLoading] = React.useState(true);
  return isLoading ? (
    <SplashScreen setIsLoading={setIsLoading} />
     ) : (
      <NavigationContainer>
        <Signin />
      </NavigationContainer>
  );
}

export default App