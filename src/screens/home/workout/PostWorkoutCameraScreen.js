import { Camera, CameraType } from 'expo-camera';
import React, { useState, useRef } from 'react';
import { Button, Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import SafeAreaView from 'components/view';
import Text from 'components/text';
import Svg, { Circle } from 'react-native-svg';
import { Entypo } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { RNHoleView } from 'react-native-hole-view';


const PostWorkoutCameraScreen = ({ navigation, route }) => {
  const {width, height} = Dimensions.get('window');
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [picture, setPicture] = useState(null);

  const handleTakePicture = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false
    };

    const newPicture = await cameraRef.current.takePictureAsync(options);
    setPicture(newPicture);
  };

  const handleRetakePicture = () => {
    setPicture(null);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleToggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const localHandleClose = () => {
    navigation.navigate('ExercisesSummary', { picture, type, ...route.params });
    setPicture(null);
  };

  const localHandleCloseNoPic = () => {
    navigation.goBack();
    setPicture(null);
  };

  return (
    <View style={styles.container}>
      {picture ? (
        <View style={styles.pictureContainer}>
          {/* Display the taken picture as the background */}
          <Image source={{ uri: picture.uri }} style={[styles.picture, (type === 'front' ? {transform: [{scaleX: -1}]} : {})]} />

          {/* Buttons container in the front */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePicture}>
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={localHandleClose}
            >
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
          </Camera>
          <RNHoleView
            style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.9, paddingTop: 56, paddingHorizontal: 28, paddingBottom: 54 }}
            holes={[{ x: 12, y: height/2 - width /2 , width: width - 12 * 2, height: width - 12 * 2, borderRadius: 16, }]}
          >
              <TapGestureHandler
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                  handleToggleCameraType();
                }
              }}
              numberOfTaps={2}
              style={{flex:1}}
            >
              <View style={{flex: 1, flexDirection: 'column-reverse'}}>
                <View style={[styles.button, styles.buttonContainer]}>
                    <View style={styles.button}>
                      <TouchableOpacity onPress={handleTakePicture}>
                          <Svg height="100" width="100">
                            <Circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                            />
                          </Svg>
                      </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity onPress={localHandleCloseNoPic}>
                    <Feather name="x" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleToggleCameraType}>
                    <Entypo name="cycle" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TapGestureHandler>
          </RNHoleView>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 16
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default PostWorkoutCameraScreen;
