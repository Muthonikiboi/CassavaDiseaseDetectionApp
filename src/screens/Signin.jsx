import React from "react";
import { SafeAreaView, StyleSheet ,ScrollView, Image ,View ,Text ,TextInput ,TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Signin=()=>{
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return(
        <SafeAreaView  style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                <Image style={styles.loginImage} source={require('../../assets/login.png')}/>
                    <View style={styles.ViewContainer}>
                        <Text style={styles.loginText1}>Login</Text>
                        <Text style={styles.loginCommText}>Please sign in to continue</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputEmail}>
                            <FontAwesome name="envelope-o" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeEmail}
                                    value={email}
                                    placeholder="Email"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>
                            <View style={styles.inputEmail}>
                            <Ionicons name="lock-open-outline" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangePassword}
                                    value={password}
                                    placeholder="Password"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            <TouchableOpacity style={styles.button} onPress={()=>{console.log("Logged In")}}>
                                <Text style={styles.loginText}>Log In</Text>
                            </TouchableOpacity>
                            <View style={styles.signUpView}>
                                <Text style={styles.signinAccount}>Don't have an account? <Text style={styles.signUp}>Sign Up</Text></Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    loginImage:{
        height:350,
        width:350
    },
    ViewContainer:{
       marginLeft:20
    },
    loginText1:{
        fontSize:40,
        color:'#0E593C'
    },
    loginCommText:{
        fontSize: 16,
        color:'black'
    },
    input: {
        flex:1,
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor:'whitesmoke',
        borderRadius:8
      },
    inputEmail:{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#A9A9A9',
    },
    forgotPassword:{
        marginLeft:230,
        color:"#0E593C"
    },
    button:{
        flex:1,
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor:'#0E593C',
        borderRadius:8,
        justifyContent:"center",
        alignItems:"center",
        marginTop:60
    },
    loginText:{
        color:"white",
        fontSize:16
    },
    signUp:{
        color:'#0E593C',
        textDecorationLine:'underline'
    },
    signUpView:{
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Signin