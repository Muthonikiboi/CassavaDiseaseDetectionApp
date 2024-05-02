import React from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import Signin from "./src/screens/Signin";
import SignUp from "./src/screens/SignUp";


const App =()=>{
  return(
    <SafeAreaView style={styles.container}>
      {/* <ExampleComponent/> */}
      <SignUp/>

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