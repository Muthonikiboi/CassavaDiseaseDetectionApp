import React from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import Signin from "./src/screens/Signin";
import SignUp from "./src/screens/SignUp";
import PasswordReset from "./src/screens/PasswordReset";


const App =()=>{
  return(
    <SafeAreaView style={styles.container}>
      {/* <ExampleComponent/> */}
      {/* <SignUp/> */}
      <PasswordReset/>
      {/* <Signin/> */}
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})
export default App