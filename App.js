import React from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import Signin from "./src/screens/Signin";
import SignUp from "./src/screens/SignUp";
import PasswordReset from "./src/screens/PasswordReset";
import ForgotPassword from "./src/screens/ForgetPassword";
import SplashScreen from "./src/screens/splashScreen";
import MosaicDescription from "./src/screens/MosaicDescription";
import Model from "./src/screens/Model";
import Settings from "./src/screens/Settings";
import BlightDescription from "./src/screens/BlightDescription";

const App =()=>{
//   const [isLoading, setIsLoading] = React.useState(true);
//   return isLoading ? (
//     <SplashScreen setIsLoading={setIsLoading} />
//   ) : (
//     <Signin />
//   );
// }


   return(
    <SafeAreaView style={styles.container}>
      {/* <ExampleComponent/> */}
      {/* <SignUp/> */}
      {/* <MosaicDescription/> */}
      {/* <PasswordReset/> */}
      {/* <ForgotPassword/> */}
      {/* <SplashScreen/> */}
      {/* <Signin/> */}
      {/* <Model/> */}
      <Settings/>
      {/* <BlightDescription/> */}
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})

export default App