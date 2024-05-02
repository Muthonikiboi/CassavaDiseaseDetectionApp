import React from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import Signin from "./src/screens/Signin";
import ExampleComponent from "./src/screens/test";


const App =()=>{
  return(
    <SafeAreaView style={styles.container}>
      {/* <ExampleComponent/> */}

      <Signin/>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})
export default App