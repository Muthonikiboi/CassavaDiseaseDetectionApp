import React from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet ,ScrollView, Image ,View ,Text ,TextInput ,ToastAndroid ,TouchableOpacity} from "react-native";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";


const PasswordReset=()=>{
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [token, setToken] = useState('');
    

    const resetPassword= () => {
        if (!token || !token.trim()=== ''){
            ToastAndroid.show("Input Token",ToastAndroid.SHORT)
            return;
        }
        if (!password || !token.trim()=== ''){
            ToastAndroid.show("Input Password",ToastAndroid.SHORT)
            return;
        }
        if (!passwordConfirm || !passwordConfirm.trim()=== ''){
            ToastAndroid.show("Input Confirm Password",ToastAndroid.SHORT)
            return;
        }
        if (password !== passwordConfirm){
            ToastAndroid.show("Passwords do not match",ToastAndroid.SHORT)
            return;
        }
        if (password.length<8){
            ToastAndroid.show("Password should be more than 8 characters",ToastAndroid.SHORT)
            return;
        }
       if (token.length<8){
            ToastAndroid.show("Token should be more than 8 characters", ToastAndroid.SHORT)
            return;
        }
        const resetUserPassword ={
            password:  password,
            passwordConfirm:  passwordConfirm,
            token: token
        };
        axios.patch(`https://cassavabackend.onrender.com/api/v1/user/resetPassword/${token}`, resetUserPassword)
            .then(response => {
                console.log(JSON.stringify(response.data, null, 2));

                if (response.data.status ==='success') {
                    ToastAndroid.show('Password reset successfully!', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Password reset failed!', ToastAndroid.SHORT);
                }
            })
            .catch(error => {
                console.log(error.response.data.message);
                ToastAndroid.show(error.response.data.message || 'Password reset failed!', ToastAndroid.SHORT);
            });
    }

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
                                    onChangeText={setToken}
                                    value={token}
                                    placeholder="Token"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>

                            <View style={styles.inputEmail}>
                            <Feather name="unlock" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setPassword}
                                    value={password}
                                    placeholder="Password"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>

                            <View style={styles.inputEmail}>
                            <Feather name="lock" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setPasswordConfirm}
                                    value={passwordConfirm}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>
                           
                            <TouchableOpacity style={styles.button} onPress={resetPassword}>
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