import React from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import Signin from "./src/screens/Signin";
import SignUp from "./src/screens/SignUp";
import PasswordReset from "./src/screens/PasswordReset";
import ForgotPassword from "./src/screens/ForgetPassword";
import SplashScreen from "./src/screens/splashScreen";

const App =()=>{
  const [isLoading, setIsLoading] = React.useState(true);
  return isLoading ? (
    <SplashScreen setIsLoading={setIsLoading} />
  ) : (
    <Signin />
  );
}

export default App