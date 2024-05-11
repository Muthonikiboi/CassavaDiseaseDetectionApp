import React from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Image ,ImageBackground, TouchableOpacity , Modal , Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const Model = () => {

    const [image, setImage] = useState(null);
    const [modalVisible , setModalVisible]=useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("ImagePicker result:", result); 

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            // Show the modal when the image is selected
            setModalVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>{
                    Alert.alert("Modal has been closed.")
                }}
            >
                <View style={styles.main}>
                    <Ionicons name="close" size={30} color="white" onPress={()=>setModalVisible(!modalVisible)}/>
                    <View style={styles.modalView}>
                        <Text style={{fontSize:30,fontWeight:"bold"}}>Load Your Image</Text>
                        {image && <Image source={{uri: image}} style={{width: 300, height: 250 ,borderRadius:20}} />}
                        
                        {/* Display the selected image if available */}
                        <TouchableOpacity style={styles.predict}>
                            <Text style={styles.predictText}>Predict</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {modalVisible && (
                <View style={styles.faintTint} />
            )}


            <ScrollView style={styles.scroll}>
                <View style={styles.view1}>
                    <View style={styles.logoView}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                        />
                    </View>
                </View>
                <View style={styles.view2}>
                    
                    <Text style={styles.hello}>Hello <Text style={[styles.label ,styles.name]}>Elizabeth</Text>,</Text>
                    <Text style={styles.text}>Upload your cassava leaf to get diagnosis and treatment.</Text>
                </View>
                
                <Text style={styles.subheading}>Learn more...</Text>
                <View style={styles.view3}>
                    <View style={styles.mosaic}>
                        <ImageBackground source={require('../../assets/Mosaic1.jpg')} style={styles.backgroundImage}>
                            <Text style={styles.label}>Cassava Mosaic</Text>
                            <Entypo name="arrow-with-circle-right" size={30} color="white" />
                        </ImageBackground>
                    </View>
                    <View style={styles.blight}>
                        <ImageBackground source={require('../../assets/blight2.jpg')} style={styles.backgroundImage}>
                            <Text style={styles.label}>Cassava Blight</Text>
                            <Entypo name="arrow-with-circle-right" size={30} color="white" />
                        </ImageBackground>
                    </View>
                </View>

                <Text style={styles.subheading}>Heal Your Crop</Text>
                <View style={styles.view4}>
                    <View style={styles.iconView}>
                        <View style={styles.iconContainer}>
                            <FontAwesome6 name="upload" size={30} color="black"/>
                            <Text style={styles.iconText}>Upload Image</Text>
                        </View>
                        <FontAwesome6 name="arrow-right" size={24} color="black" style={styles.icon}/>
                        <View style={[styles.iconContainer,styles.icon]}>
                            <FontAwesome6 name="hand-holding-medical" size={30} color="black"/>
                            <Text style={styles.iconText}>Get Diagnosis</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                                <Text style={styles.loginText}>Upload Image</Text>
                    </TouchableOpacity>

                    <View style={styles.iconView}>
                        <View style={styles.iconContainer}>
                            <FontAwesome6 name="upload" size={30} color="black"/>
                            <Text style={styles.iconText}>Take Photo</Text>
                        </View>
                        <FontAwesome6 name="arrow-right" size={24} color="black" style={styles.icon}/>
                        <View style={[styles.iconContainer,styles.icon]}>
                            <FontAwesome6 name="hand-holding-medical" size={30} color="black"/>
                            <Text style={styles.iconText}>Get Diagnosis</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button}>
                                <Text style={styles.loginText}>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        marginTop:60,
        marginLeft: 5,
    },
    view1:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        marginBottom: 8
    },
    logoView: {
        marginLeft: 10,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#0E593C',
        padding: 5
    },
    logo: {
        width: 50,
        height: 50
    },
    view2: {
        height: 70,
        marginBottom: 8,
        marginLeft:15
    },
    hello:{
        fontSize: 30
    },
    name:{
        color: '#0E593C',
        fontWeight: 'bold',
        fontSize: 30
    },
    text:{
        fontSize: 16
    },
    view3: {
        height: 150,
        marginBottom: 8,
        flexDirection: 'row',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textShadowColor: "black",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    view4: {
        height: 265
    },
    mosaic:{
        height:120,
        width:'44%',
        marginLeft:'4%',
        marginTop:15,
        borderRadius:15,
        overflow:'hidden',
        borderWidth:2,
        borderColor:'#0E593C'
    },
    blight:{
        height:120,
        width:'44%',
        marginLeft:'4%',
        marginTop:15,
        borderRadius:15,
        overflow:'hidden',
        borderWidth:2,
        borderColor:'#0E593C'
    },
    subheading:{
        marginLeft:20,
        color: '#0E593C',
        fontSize: 24,
        fontWeight: "bold",
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginTop:10,
        alignItems: 'center',
        justifyContent:'space-around',
        borderWidth:2,
        borderColor:'#0E593C',
        borderRadius:20,
        padding:5
    },
    iconText: {
        marginTop: 2,
        textAlign: 'center',
    },
    icon:{
        marginLeft:20
    },
    button:{
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor:'#0E593C',
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10
    },
    loginText:{
        color:"white",
        fontSize:16
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height:600
      },
    predict:{
        marginTop:10,
        borderRadius:20,
        padding:5,
        elevation:2,
        backgroundColor:'#0E593C',
        width:150,
        height:35,
        alignItems:"center",
        justifyContent:'center',
    },
    predictText:{
        fontSize:20,
        color: 'white',
        fontWeight: 'bold',    
    },
    main:{
        marginTop:20,
        height:200,
        marginLeft:15,
        marginRight:15
    },faintTint: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black background
        zIndex: 6, // Ensure the tint is behind the modal
    },
})

export default Model;
