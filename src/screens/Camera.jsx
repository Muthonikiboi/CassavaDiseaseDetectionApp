import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Buttons';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Cam() {
  const [hasCameraPermision, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [predicted, setPredicted] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [disease, setDiseaseData] = useState(false);
  const [recommend, setRecommendData] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(()=>{
    (async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermision(cameraStatus.status === 'granted');
    })();
}, []);

  const takePicture = async function(){
    if(cameraRef){
        try{
            const options = {
                quality: 0.5,
                ratio: '3:3'
            };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data);
            setImage(data.uri);
        }catch{
            console.log('Error taking picture');
        }
    }
}

if(hasCameraPermision === false){
  return <Text>No camera permision</Text>
}

  const savePicture = async () => {
    if (image) {
      setShowModal(true);
      try {
        const mimeType = 'image/jpeg';

        const formData = new FormData();
        formData.append('file', {
          uri: image,
          type: mimeType,
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
          console.log(response.data.Predicted.length);

          setPredicted(response.data.Predicted);
          setConfidence(response.data.Confidence);

          const diseaseUrl = 'https://cassavabackend.onrender.com/api/v1/disease';
          const params = { diseases: response.data.Predicted };

          if (response.data.Predicted.length === 26 || response.data.Predicted.length === 28) {
            try {
              const res = await axios.get(diseaseUrl, { params });

              if (res.data.status === 'success') {
                const data = res.data.data.diseases[response.data.Predicted.length === 26 ? 1 : 0];
                const randomItem = getRandomItem(data.treatment);
                console.log(randomItem);
                setRecommendData(randomItem);
              }
            } catch (err) {
              console.error("Error fetching disease data:", err);
              ToastAndroid.show("Error occurred while fetching disease data", ToastAndroid.SHORT);
            }
          }
        } else {
          console.log('Image capturing failed');
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
    } else {
      console.log('Image selection cancelled');
    }
  };

  const closeModal = () => {
    setDiseaseData('');
    setPredicted('');
    setConfidence('');
    setImage(null);
    setShowModal(!showModal);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          ToastAndroid.show("Modal has been closed.", ToastAndroid.SHORT);
          setShowModal(!showModal);
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

            {predicted === 'Cassava_Mosaic_Disease(CMD)' && (
              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('MosaicDescription')}>
                <Text style={styles.loginText}>Learn More</Text>
              </TouchableOpacity>
            )}
            {predicted === 'Cassava___bacterial_blight' && (
              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('BlightDescription')}>
                <Text style={styles.loginText}>Learn More</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {showModal && <View style={styles.faintTint} />}

      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button title="Re-take" onPress={() => setImage(null)} icon="retweet" />
            <Button title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Take a picture" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    marginTop: 30
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  button1: {
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
