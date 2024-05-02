import React from "react";
import { SafeAreaView, StyleSheet ,ScrollView, Image ,View ,Text ,TextInput ,TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const SignUp=()=>{
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [username, onChangeUsername] = React.useState('');

    return(
        <SafeAreaView  style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <View style={styles.imageView}>
                       <Image style={styles.loginImage} source={require('../../assets/Sign_up.png')}/> 
                    </View>
                    <View style={styles.ViewContainer}>
                        <Text style={styles.loginText1}>Register</Text>
                        <Text style={styles.loginCommText}>Create Your Account Here</Text>
                        <View style={styles.inputContainer}>


                            <View style={styles.inputEmail}>
                            <FontAwesome6 name="user" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeUsername}
                                    value={username}
                                    placeholder="Username"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>

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

                            <View style={styles.inputEmail}>
                            <Ionicons name="lock-open-outline" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangePassword}
                                    value={password}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#A9A9A9"
                                />
                            </View>
                           
                            <Text style={styles.registration}>By registeriong you agree to our<Text style={styles.forgotPassword}> Terms and Conditions</Text></Text>
                            <TouchableOpacity style={styles.button} onPress={()=>{console.log("You have created your account successfully")}}>
                                <Text style={styles.loginText}>Register</Text>
                            </TouchableOpacity>
                            <View style={styles.signUpView}>
                                <Text style={styles.signinAccount}>Already have an account? <Text style={styles.signUp}>Log In</Text></Text>
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
        height:250,
        width:250,
        marginLeft:60,
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
        borderRadius:20
      },
    inputEmail:{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#A9A9A9',
    },
    registration:{
        fontSize:11,
        marginLeft:50,
    },
    forgotPassword:{
        color:"#0E593C",
        textDecorationLine:"underline"
    },
    button:{
        flex:1,
        height: 40,
        margin: 12,
        padding: 10,
        marginTop:35,
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

export default SignUp