import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from "../components/Tabs";
import { Link } from 'expo-router';

const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        if (!email || !password || !email.trim()=== '' || !password.trim()=== '') {
            ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
            return;
        }

        console.log(email, password);
        const userData = {
            email: email,
            password,
        }
        try {
            // setLoading(true); // Set loading to true
            const res = await axios.post("https://cassavabackend.onrender.com/api/v1/user/login", userData);
            console.log(JSON.stringify(res.data, null, 2));

            if (res.data.status === 'success') {
                ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Tabs' }],
                });
                await AsyncStorage.setItem('token', res.data.token);
                await AsyncStorage.setItem('userEmail', res.data.data.user.email);
                await AsyncStorage.setItem('id', res.data.data.user._id);
                await AsyncStorage.setItem('userName', res.data.data.user.name);
                await AsyncStorage.setItem('userRole', res.data.data.user.role);
                await AsyncStorage.setItem('isLocked', 'true');
            } else {
                ToastAndroid.show('Login failed. Please check your credentials.', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error(error);
            ToastAndroid.show('Login failed. Please check your credentials.', ToastAndroid.SHORT);
        } finally {
            setLoading(false); // Set loading to false
        }
    }

    return (
        <SafeAreaView style={styles.container}>
           <ScrollView keyboardShouldPersistTaps={'always'}>
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
                            <Text style={styles.forgotPassword} onPress={() => navigation.navigate('forgetPassword')}>Forgot Password?</Text>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.loginText}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <View style={styles.signUpView}>
                                    <Text style={styles.signinAccount}>Don't have an account? <Text style={styles.signUp} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        color: '#0E593C'
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
