import React from "react";
import { SafeAreaView, StyleSheet ,ScrollView, Image ,View ,Text ,TextInput ,TouchableOpacity ,ToastAndroid} from "react-native";
import { Feather } from '@expo/vector-icons';
import axios from "axios";

const ForgotPassword=()=>{
    const [email, onChangeEmail] = React.useState('');

    function forgetPasswordBtn(){
        console.log(email);
        const userData={
            email:email,
        }
        axios
        .post("https://cassavabackend.onrender.com/api/v1/user/forgotPassword",userData)
        .then(res => {
            console.log(res.data)
            if (res.data.status ==="success") {
                ToastAndroid.show('Check Link on Your Email', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Wrong Email Address. Please check your credentials.', ToastAndroid.SHORT);
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <SafeAreaView  style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                <Image style={styles.loginImage} source={require('../../assets/Forgot_password.png')}/>
                    <View style={styles.ViewContainer}>
                        <Text style={styles.loginText1}>Forgot Password?</Text>
                        <Text style={styles.loginCommText}>Enter email address to get a link on your email to reset your password</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputEmail}>
                            <Feather name="mail" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeEmail}
                                    value={email}
                                    placeholder="Email"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>
                            <TouchableOpacity style={styles.button} onPress={forgetPasswordBtn}>
                                <Text style={styles.loginText}>Send Link</Text>
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
    loginImage:{
        height:360,
        width:360
    },
    ViewContainer:{
       marginLeft:20
    },
    loginText1:{
        fontSize:30,
        color:'#0E593C',
        marginBottom:10
    },
    loginCommText:{
        fontSize: 13,
        color:'black',
        marginBottom:10
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
        borderRadius:20,
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

export default ForgotPassword