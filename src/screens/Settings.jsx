import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView ,ScrollView, StyleSheet, Text,View ,TouchableOpacity,ToastAndroid} from "react-native";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Settings =({navigation})=>{
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch user details from AsyncStorage
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const email = await AsyncStorage.getItem('userEmail');
                const username = await AsyncStorage.getItem('userName');
                const role = await AsyncStorage.getItem('userRole');
                const userId = await AsyncStorage.getItem('id');
                const token = await AsyncStorage.getItem('token');

                if (email !== null) setEmail(email);
                if (username !== null) setUsername(username);
                if (role !== null) setRole(role);
                if (userId !== null) setUserId(userId);
                if (token !== null) setToken(token);
            } catch (error) {
                console.error('Error fetching user details', error);
            } finally {
                setLoading(false); // Set loading to false once the fetching is done
            }
        };

        fetchUserDetails();
    }, []);

    // Function to logout the user
    const logOut = async () => {
        try {
            ToastAndroid.show('Logged out successfully!', ToastAndroid.SHORT);
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],  
        });
            await AsyncStorage.multiRemove(['isLocked', 'token', 'userEmail', 'userName', 'userRole', 'id']);
        } catch (error) {
            console.error('Error during logout', error);
            ToastAndroid.show('Error during logout', ToastAndroid.SHORT);
        }
    };

    // Function to delete the account
    const deleteAccount = async () => {
        try {

            if (!token) {
                ToastAndroid.show('User is not authenticated', ToastAndroid.SHORT);
                return;
            }
    
            const response = await axios.delete(`https://cassavabackend.onrender.com/api/v1/user/softDelete/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.data.status === 'success') {
                ToastAndroid.show('Account deleted successfully!', ToastAndroid.SHORT);
    
                // Remove all stored user information
                await AsyncStorage.multiRemove(['isLocked', 'token', 'userEmail', 'userName', 'userRole', 'id']);
    
                // Navigate to Login screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                });
            } else {
                ToastAndroid.show('Error deleting account', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error:', error);
            ToastAndroid.show('Error deleting account', ToastAndroid.SHORT);
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>Settings</Text>
                </View>
                <View style={styles.view1}>
                <AntDesign name="arrowleft" size={24} marginRight={10} marginLeft={10} color="black" onPress={() => navigation.navigate('Model')}/>
                <Text style={{fontSize:25, marginRight:100}}>Account</Text>
                <TouchableOpacity style={styles.button} onPress={logOut}>
                    <Text style={styles.loginText} >Log Out</Text>
                    <Entypo name="log-out" size={15} color="white" />
                </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.main}>
                        <View style={{height:50 ,alignItems:'center',marginLeft:20 ,flexDirection:'row'}}>
                        <Feather name="user" size={30} color='#0E593C' />
                        <Text style={{fontSize:20,marginLeft:20 ,color:'#0E593C'}}>Username</Text>
                        </View>
                        <Text style={{marginLeft:50, fontSize:16}}>{username}</Text>
                    </View>

                    <View style={styles.main}>
                        <View style={{height:50 ,alignItems:'center',marginLeft:20 ,flexDirection:'row'}}>
                        <Fontisto name="email" size={30} color='#0E593C' />
                        <Text style={{fontSize:20,marginLeft:20 ,color:'#0E593C'}}>Email</Text>
                        </View>
                        <Text style={{marginLeft:50, fontSize:16}}>{email}</Text>
                    </View>

                    <View style={styles.main}>
                        <View style={{height:50 ,alignItems:'center',marginLeft:20 ,flexDirection:'row'}}>
                        <FontAwesome name="user-circle" size={30} color='#0E593C' />
                        <Text style={{fontSize:20,marginLeft:20 ,color:'#0E593C'}}>Role</Text>
                        </View>
                        <Text style={{marginLeft:50, fontSize:16}}>User</Text>
                    </View>
                </View>

                <View style={styles.deleteView}>
                <TouchableOpacity style={styles.button1} onPress={deleteAccount}>
                    <Text style={styles.loginTxt}>Delete Account</Text>
                    <MaterialCommunityIcons name="delete-outline" size={23} color="white" />
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },scroll:{
        marginTop:60
    },
    headingView:{
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        fontSize:40,
        color:'#0E593C',
        padding:15
    },
    view1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:70
    },
    button:{
        width:130,
        height: 30,
        padding:5,
        backgroundColor:'#0E593C',
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:'row',
    },
    loginText:{
        color:"white",
        fontSize:16,
        marginRight:10
    },
    body:{
        height:350,
        marginTop:10
    },
    main:{
        height:100,
        marginTop:10,
        backgroundColor:'whitesmoke',
        margin:10,
        borderRadius:15,
        // borderWidth:0.5
    },
    button1:{
        flex:1,
        height: 45,
        margin: 12,
        padding: 10,
        backgroundColor:'#0E593C',
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center",
        marginTop:40,
        marginLeft:80,
        flexDirection:'row',
        width:200
    },
    loginTxt:{
        color:"white",
        fontSize:20,
        marginRight:10
    }
})


export default Settings