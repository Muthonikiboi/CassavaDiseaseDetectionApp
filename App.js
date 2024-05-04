import React from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import Signin from "./src/screens/Signin";
import SignUp from "./src/screens/SignUp";
import PasswordReset from "./src/screens/PasswordReset";
import ForgotPassword from "./src/screens/ForgetPassword";
import SplashScreen from "./src/screens/splashScreen";
import Description from "./src/screens/Description";
import Model from "./src/screens/Model";
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
      {/* <Description/> */}
      {/* <PasswordReset/> */}
      {/* <ForgotPassword/> */}
      {/* <SplashScreen/> */}
      {/* <Signin/> */}
      <Model/>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})

export default App