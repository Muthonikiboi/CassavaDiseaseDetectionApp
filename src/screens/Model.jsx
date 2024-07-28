import React, { useState, useEffect } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, Button, Text, Image, TouchableOpacity, Modal, Alert, ToastAndroid } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Model = () => {
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [predicted, setPredicted] = useState('');
    const [confidence, setConfidence] = useState(null);
    const [recommend, setRecommendData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const navigation = useNavigation(); // Use navigation hook

    // Fetch user details from AsyncStorage
     useEffect(() => {
            const fetchUserDetails = async () => {
                try {
                    const username = await AsyncStorage.getItem('userName');
    
                    if (username !== null) setUsername(username);
                } catch (error) {
                    console.error('Error fetching user details', error);
                } finally {
                    setLoading(false); // Set loading to false once the fetching is done
                }
            };
    
            fetchUserDetails();
        }, []);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setModalVisible(true);

                const { uri } = result.assets[0];
                if (!uri) {
                    console.warn('No image URI found in the result');
                    return;
                }

                console.log("Image has been selected");
                const formData = new FormData();

                formData.append('file', {
                    uri: uri,
                    type: result.assets[0].mimeType,
                    name: "cassava.png",
                });

                const config = {
                    method: 'post',
                    url: 'https://cassavamodel-fastapi.onrender.com/predict',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: formData
                };

                const response = await axios(config);
                console.log(JSON.stringify(response.data, null, 2));

                if (response.data && response.data.Predicted && response.data.Confidence !== undefined) {
                    console.log(response.data.Predicted.length)

                    setPredicted(response.data.Predicted);
                    setConfidence(response.data.Confidence);

                    if(response.data.Predicted.length === 26){
                        try{
                            const res = await axios.get('https://cassavabackend.onrender.com/api/v1/disease', {
                                params:{
                                    diseases: response.data.Predicted,
                                }
                            });

                            if (res.data.status === 'success'){
                                const data = res.data.data.diseases[1];
                                // console.log(data)
                                function getRandomItem(array) {
                                    const randomIndex = Math.floor(Math.random() * array.length);
                                    return array[randomIndex];
                                }
        
                                const randomItem = getRandomItem(data.treatment);
                                console.log(randomItem)
                                setRecommendData(randomItem);
        
                            }
                        }catch(err){
                            console.log(err)
                        }
                    }else if (response.data.Predicted.length === 28){
                        try{
                            const res = await axios.get('https://cassavabackend.onrender.com/api/v1/disease', {
                                params:{
                                    diseases: response.data.Predicted,
                                }
                            });

                            if (res.data.status === 'success'){
                                const data = res.data.data.diseases[0];
                                // console.log(data)
                                function getRandomItem(array) {
                                    const randomIndex = Math.floor(Math.random() * array.length);
                                    return array[randomIndex];
                                }
        
                                const randomItem = getRandomItem(data.treatment);
                                console.log(randomItem)
                                setRecommendData(randomItem);
        
                            }
                        }catch(err){
                            console.log(err)
                        }
                    } 
                }
            } else {
                ToastAndroid.show("You've not selected any image", ToastAndroid.SHORT);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
              const statusCode = err.response?.status;
              console.log('Axios error:', err.response?.data || err.message);
              if (statusCode === 502 || statusCode === 503) {
                ToastAndroid.show("This is not a cassava leaf. Please try again later.", ToastAndroid.SHORT);
              } else {
                ToastAndroid.show("An unexpected error occurred", ToastAndroid.SHORT);
              }
            } else {
              console.error('Non-Axios error:', err);
              ToastAndroid.show("An unexpected error occurred", ToastAndroid.SHORT);
            }
          }
    };

const closeModal = () =>{
    setPredicted('');
    setConfidence(null);
    setRecommendData('');
    setModalVisible(!modalVisible);
}


    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.main}>
                    <Ionicons name="close" size={30} color="white" onPress={closeModal} />
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Load Your Image</Text>
                        {image && <Image source={{ uri: image }} style={{ width: 300, height: 250, borderRadius: 20 }} />}
                        <Text style={styles.predicts}>Predicted: <Text style={styles.predict}>{predicted}</Text></Text>
                        <Text style={{ fontSize: 13, color: 'red' }}>Confidence: {confidence}</Text>
                        <Text style={styles.predicts}>Recommendation: <Text style={styles.predict}>{recommend}</Text></Text>

                        {predicted === 'Cassava Mosaic Disease (CMD)' && (
                            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('MosaicDecription'); closeModal();}}>
                            <Text style={styles.loginText}>Learn More</Text>
                            </TouchableOpacity>
                        )}
                        {predicted === 'Cassava___bacterial_blight' && (
                            <TouchableOpacity style={styles.button} onPress={() =>{navigation.navigate('BlightDecription'); closeModal();}}>
                                <Text style={styles.loginText}>Learn More</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>

            {modalVisible && (
                <View style={styles.faintTint} />
            )}

            <ScrollView style={styles.scroll}>
                <View style={styles.view1}>
                    <View style={styles.view2}>
                        <Text style={styles.hello}>Hello <Text style={[styles.label, styles.name]}>{username}</Text>,</Text>
                        <Text style={styles.text}>Upload your cassava leaf to get diagnosis and treatment.</Text>
                    </View>
                    <View style={styles.logoView}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                        />
                    </View>
                </View>

                <Text style={styles.subheading}>Treat your Crop...</Text>
                <View style={styles.view3}>
                    <View style={styles.iconContain}>
                        <View style={styles.iconLabelContainer}>
                            <FontAwesome name="camera" size={30} color="black" />
                            <Text style={styles.label}>Take Photo</Text>
                        </View>
                        <FontAwesome6 name="arrow-right" size={24} color="black" style={styles.icon} />
                        <View style={styles.iconLabelContainer}>
                            <FontAwesome name="leaf" size={30} color="black" />
                            <Text style={styles.label}>Predict</Text>
                        </View>
                        <FontAwesome6 name="arrow-right" size={24} color="black" style={styles.icon} />
                        <View style={styles.iconLabelContainer}>
                            <FontAwesome6 name="hand-holding-medical" size={30} color="black" />
                            <Text style={styles.label}>Get Diagnosis</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.subheading}>Click The Buttons...</Text>
                <View style={styles.view4}>
                    <View style={styles.iconLabelContainer}>
                        <FontAwesome name="camera" size={30} color="black" />
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
                            <Text style={styles.loginText}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconLabelContainer}>
                        <FontAwesome6 name="upload" size={30} color="black" />
                        <TouchableOpacity style={styles.button} onPress={pickImage}>
                            <Text style={styles.loginText}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        marginTop: 52,
        marginLeft: 5,
        backgroundColor: 'whitesmoke'
    },
    view1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 150,
        margin: 8,
        backgroundColor: '#F0FFF0',
        overflow: 'hidden',
        padding: 10,
        borderRadius: 15
    },
    view2: {
        width: 250
    },
    logo: {
        width: 150,
        height: 180
    },
    hello: {
        fontSize: 30
    },
    name: {
        color: '#0E593C',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text: {
        fontSize: 16
    },
    view3: {
        height: 150,
        marginBottom: 8,
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: '#F0FFF0',
        borderRadius: 15,
        margin: 8,
    },
    iconContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: 30,
        marginTop: 45
    },
    iconLabelContainer: {
        alignItems: 'center',
    },
    label: {
        marginTop: 5,
        fontSize: 16,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    view4: {
        height: 150,
        marginTop: 15,
        backgroundColor: '#F0FFF0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        borderRadius: 15,
        margin: 8,
    },
    subheading: {
        marginLeft: 20,
        color: '#0E593C',
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 30
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        marginTop: 2,
        textAlign: 'center',
    },
    icon: {
        marginLeft: 20
    },
    button: {
        width: 150,
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: '#0E593C',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    loginText: {
        color: "white",
        fontSize: 16
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
        height: 600
    },
    predict: {
        marginTop: 10,
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        backgroundColor: '#0E593C',
        width: 150,
        height: 35,
        alignItems: "center",
        justifyContent: 'center',
    },
    predictText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    main: {
        marginTop: 20,
        height: 200,
        marginLeft: 15,
        marginRight: 15
    },
    faintTint: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
        zIndex: 6, // Ensure the tint is behind the modal
    },
    predicts: {
        fontSize: 15,
        marginTop: 15,
        color: '#0E593C',
        fontWeight: 'bold'
    },
    predict: {
        color: "black",
        textDecorationLine: "none"
    }
});

export default Model;