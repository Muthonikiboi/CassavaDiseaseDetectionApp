import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import Tabs from "../components/Tabs";
import { Link } from 'expo-router';

const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isloggedIn, setIsLoggedIn] = useState(false);

    function handleSubmit() {
        console.log(email, password);
        const userData = {
            email: email,
            password,
        }
        axios
            .post("https://apple-plant-disease.onrender.com/api/v1/user/login", userData)
            .then(res => {
                console.log(res.data)
                if (res.data.status == "success") {
                    ToastAndroid.show('Log in successful', ToastAndroid.SHORT);
                    setIsLoggedIn(true)
                } else {
                    ToastAndroid.show('Failed to log in. Please check your credentials.', ToastAndroid.SHORT);
                }
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            {isloggedIn ? <Tabs /> : <ScrollView keyboardShouldPersistTaps={'always'}>
                <View style={styles.content}>
                    <Image style={styles.loginImage} source={require('../../assets/login.png')} />
                    <View style={styles.ViewContainer}>
                        <Text style={styles.loginText1}>Login</Text>
                        <Text style={styles.loginCommText}>Please sign in to continue</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputEmail}>
                                <Feather name="mail" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setEmail}
                                    value={email}
                                    placeholder="Email"
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
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.loginText}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <View style={styles.signUpView}>
                                    <Text style={styles.signinAccount}>Don't have an account? <Link href="/SignUp">Sign Up</Link></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginImage: {
        height: 350,
        width: 350
    },
    ViewContainer: {
        marginLeft: 20
    },
    loginText1: {
        fontSize: 40,
        color: '#0E593C'
    },
    loginCommText: {
        fontSize: 16,
        color: 'black'
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: 'whitesmoke',
        borderRadius: 20
    },
    inputEmail: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#A9A9A9',
    },
    forgotPassword: {
        marginLeft: 230,
        color: "#0E593C"
    },
    button: {
        flex: 1,
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: '#0E593C',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60
    },
    loginText: {
        color: "white",
        fontSize: 16
    },
    signUp: {
        color: '#0E593C',
        textDecorationLine: 'underline'
    },
    signUpView: {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Signin;
