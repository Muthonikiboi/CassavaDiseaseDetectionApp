import React from "react";
import { SafeAreaView ,ScrollView, StyleSheet, Text,View ,TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Settings =()=>{
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>Settings</Text>
                </View>
                <View style={styles.view1}>
                <AntDesign name="arrowleft" size={24} color="black" />
                <Text style={{fontSize:25, marginRight:120}}>Account</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{console.log("Log Out Successful")}}>
                    <Text style={styles.loginText}>Log Out</Text>
                    <Entypo name="log-out" size={15} color="white" />
                </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.main}>
                        <View style={{height:50 ,alignItems:'center',marginLeft:20 ,flexDirection:'row'}}>
                        <Feather name="user" size={30} color='#0E593C' />
                        <Text style={{fontSize:16,marginLeft:20 ,color:'#0E593C'}}>Username</Text>
                        </View>
                        <Text style={{marginLeft:50, fontSize:25}}>JoyElizabeth Muthoni Kiboi</Text>
                    </View>

                    <View style={styles.main}>
                        <View style={{height:50 ,alignItems:'center',marginLeft:20 ,flexDirection:'row'}}>
                        <Fontisto name="email" size={30} color='#0E593C' />
                        <Text style={{fontSize:16,marginLeft:20 ,color:'#0E593C'}}>Email</Text>
                        </View>
                        <Text style={{marginLeft:50, fontSize:25}}>kiboijoye254@gmail.com</Text>
                    </View>

                    <View style={styles.main}>
                        <View style={{height:50 ,alignItems:'center',marginLeft:20 ,flexDirection:'row'}}>
                        <FontAwesome name="user-circle" size={30} color='#0E593C' />
                        <Text style={{fontSize:16,marginLeft:20 ,color:'#0E593C'}}>Role</Text>
                        </View>
                        <Text style={{marginLeft:50, fontSize:25}}>User</Text>
                    </View>
                </View>

                <View style={styles.deleteView}>
                <TouchableOpacity style={styles.button1} onPress={()=>{console.log("Account Deleted Successfully")}}>
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
    },
    scroll:{
        marginTop:50
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
        flexDirection:'row'
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
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor:'#0E593C',
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginTop:40,
        marginLeft:55,
        flexDirection:'row',
        width:250
    },
    loginTxt:{
        color:"white",
        fontSize:20,
        marginRight:10
    }
})

export default Settings