import React from "react";
import { SafeAreaView, StyleSheet ,ScrollView, Image ,View ,Text ,TextInput ,TouchableOpacity} from "react-native";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const PasswordReset=()=>{
    const [confirmPassword, onChangeConfirmPassword] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [token, onChangeToken] = React.useState('');

    return(
        <SafeAreaView  style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <View style={styles.imageView}>
                       <Image style={styles.loginImage} source={require('../../assets/Reset_password.png')}/> 
                    </View>
                    <View style={styles.ViewContainer}>
                        <Text style={styles.loginText1}>Reset Password</Text>
                        <Text style={styles.loginCommText}>Reset Your Account Here</Text>
                        <View style={styles.inputContainer}>


                            <View style={styles.inputEmail}>
                            <MaterialIcons name="generating-tokens" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeToken}
                                    value={token}
                                    placeholder="Token"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>

                            <View style={styles.inputEmail}>
                            <Feather name="unlock" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangePassword}
                                    value={password}
                                    placeholder="Password"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>

                            <View style={styles.inputEmail}>
                            <Feather name="lock" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeConfirmPassword}
                                    value={confirmPassword}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>
                           
                            <TouchableOpacity style={styles.button} onPress={()=>{console.log("You have created your account successfully")}}>
                                <Text style={styles.loginText}>Reset</Text>
                            </TouchableOpacity>
                            <View style={styles.signUpView}>
                                <Text style={styles.signinAccount}>Already have an account? <Text style={styles.signUp}>Sign In</Text></Text>
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
    scroll:{
        marginTop:50
    },
    loginImage:{
        height:300,
        width:300,
        marginLeft:30,
    },
    ViewContainer:{
       marginLeft:20
    },
    loginText1:{
        fontSize:30,
        color:'#0E593C'
    },
    loginCommText:{
        fontSize: 14,
        color:'black'
    },
    input: {
        flex:1,
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor:'whitesmoke',
        borderRadius:20
      },
    inputEmail:{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#A9A9A9',
    },
    button:{
        flex:1,
        height: 40,
        margin: 12,
        padding: 10,
        marginTop:40,
        backgroundColor:'#0E593C',
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
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

export default PasswordReset