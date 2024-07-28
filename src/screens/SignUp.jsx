import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import axios from "axios";

const SignUp = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [username, onChangeUsername] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleSubmit = async () => {
        if (!email.trim() || !password.trim() || !username.trim() || !confirmPassword.trim()) {
            ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
            return;
        }

        if (!validateEmail(email)) {
            ToastAndroid.show('Please enter a valid email address', ToastAndroid.SHORT);
            return;
        }

        if (password !== confirmPassword) {
            ToastAndroid.show('Password and Confirm Password do not match', ToastAndroid.SHORT);
            return;
        }

        try {
            const userRegistrationData = {
                name: username,
                email: email,
                password: password,
                passwordConfirm: confirmPassword
            };

            const response = await axios.post("https://cassavabackend.onrender.com/api/v1/user/signup", userRegistrationData);

            if (response.data.status === "success") {
                ToastAndroid.show('You have Registered Successfully!', ToastAndroid.SHORT);
                navigation.navigate('SignIn');
            } else {
                ToastAndroid.show('Account Already Exists', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            ToastAndroid.show(error.response?.data?.message || 'An error occurred', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <View style={styles.imageView}>
                        <Image style={styles.loginImage} source={require('../../assets/Sign_up.png')} />
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
                                <Feather name="mail" size={24} color="black" />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeEmail}
                                    value={email}
                                    placeholder="Email"
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
                                    secureTextEntry
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
                                    secureTextEntry
                                />
                            </View>

                            <Text style={styles.registration}>By registering you agree to our<Text> Terms and Conditions</Text></Text>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.loginText}>Register</Text>
                            </TouchableOpacity>
                            <View style={styles.signUpView}>
                                <Text style={styles.signinAccount}>Already have an account? <Text style={styles.signUp} onPress={() => navigation.navigate('SignIn')}>Sign In</Text></Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        marginTop: 30,
    },
    container: {
        flex: 1
    },
    loginImage: {
        height: 250,
        width: 250,
        marginLeft: 60,
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
        borderColor: '#0E593C',
    },
    registration: {
        fontSize: 11,
        marginLeft: 50,
    },
    button: {
        flex: 1,
        height: 40,
        margin: 12,
        padding: 10,
        marginTop: 30,
        backgroundColor: '#0E593C',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
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
    },
    signinAccount: {
        fontSize: 16,
    }
});

export default SignUp;
