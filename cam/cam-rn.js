import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { LineChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

const CameraCapture = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAutoCapturing, setIsAutoCapturing] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [lightness, setLightness] = useState(0);
  const [maxLightness, setMaxLightness] = useState(0);
  const [lightnessHistory, setLightnessHistory] = useState([]);
  const [lightnessThreshold, setLightnessThreshold] = useState(100);
  const [pixelSampling, setPixelSampling] = useState(1);
  const [autoCaptureInterval, setAutoCaptureInterval] = useState(5);
  const [numPhotos, setNumPhotos] = useState(1);
  const [photoDelay, setPhotoDelay] = useState(50);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const lastAutoCaptureTime = useRef(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  const toggleCapture = () => {
    setIsCapturing(!isCapturing);
  };

  const toggleAutoCapture = () => {
    setIsAutoCapturing(!isAutoCapturing);
  };

  const toggleCameraType = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhotos([...photos, photoData]);
    }
  };

  const handlePhotoSelection = (photo) => {
    setSelectedPhoto(photo);
  };

  const saveSelectedPhoto = async () => {
    if (selectedPhoto) {
      const asset = await MediaLibrary.createAssetAsync(selectedPhoto.uri);
      await MediaLibrary.createAlbumAsync('Camera Capture', asset, false);
    }
  };

  const calculateLightness = () => {
    if (cameraRef.current) {
      const { width, height } = cameraRef.current.getAvailableTextureSize();
      const imageData = cameraRef.current.getImageData(0, 0, width, height);
      const data = imageData.data;
      let totalLightness = 0;
      const samplingRate = pixelSampling;

      for (let i = 0; i < data.length; i += 4 * samplingRate) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
        totalLightness += lightness;
      }

      const averageLightness = totalLightness / (data.length / (4 * samplingRate));
      setLightness(averageLightness);

      const newLightnessHistory = [...lightnessHistory, averageLightness];
      setLightnessHistory(newLightnessHistory.slice(-100)); // Keep last 100 values
      setMaxLightness(Math.max(...newLightnessHistory));

      if (isAutoCapturing && averageLightness > lightnessThreshold) {
        const currentTime = Date.now();
        const cooldownTime = autoCaptureInterval * 1000;
        if (currentTime - lastAutoCaptureTime.current >= cooldownTime) {
          takePhoto();
          lastAutoCaptureTime.current = currentTime;
        }
      }
    }
  };

  useEffect(() => {
    let captureInterval;
    if (isCapturing) {
      captureInterval = setInterval(calculateLightness, 100);
    } else {
      clearInterval(captureInterval);
    }
    return () => clearInterval(captureInterval);
  }, [isCapturing, pixelSampling, lightnessThreshold, isAutoCapturing, autoCaptureInterval]);

  const capturePhotos = async () => {
    for (let i = 0; i < numPhotos; i++) {
      await new Promise((resolve) => setTimeout(resolve, i * photoDelay));
      await takePhoto();
    }
  };

  const renderPhotos = () => {
    return (
      <ScrollView horizontal contentContainerStyle={styles.photoGrid}>
        {photos.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => handlePhotoSelection(photo)}>
            <Image source={{ uri: photo.uri }} style={[styles.photo, selectedPhoto === photo && styles.selectedPhoto]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isPreviewVisible && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          onCameraReady={() => setIsCapturing(true)}
        />
      )}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={togglePreview}>
          <Text style={styles.buttonText}>{isPreviewVisible ? 'Hide Preview' : 'Show Preview'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCapture}>
          <Text style={styles.buttonText}>{isCapturing ? 'Stop Capture' : 'Start Capture'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleAutoCapture}>
          <Text style={styles.buttonText}>{isAutoCapturing ? 'Stop Auto Capture' : 'Start Auto Capture'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.buttonText}>Switch Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={capturePhotos}>
          <Text style={styles.buttonText}>Capture {numPhotos} Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveSelectedPhoto}>
          <Text style={styles.buttonText}>Save Selected Photo</Text>
        </TouchableOpacity>
      </View>
      {renderPhotos()}
      <View style={styles.lightnessContainer}>
        <Text style={styles.lightnessText}>Average Lightness: {lightness.toFixed(2)}</Text>
        <Text style={styles.lightnessText}>Max Lightness (10s): {maxLightness.toFixed(2)}</Text>
        <LineChart
          data={{
            labels: Array.from({ length: lightnessHistory.length }, (_, i) => `${i}`),
            datasets: [
              {
                data: lightnessHistory,
              },
            ],
          }}
          width={width}
          height={200}
          chartConfig={{
            backgroundColor: '#0a0a1a',
            backgroundGradientFrom: '#0a0a1a',
            backgroundGradientTo: '#0a0a1a',
            declineColor: 'rgba(255, 255, 255, 0.8)',
            color: (opacity = 1) => `rgba(0, 200, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '0',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Lightness Threshold:</Text>
          <TextInput
            style={styles.input}
            value={lightnessThreshold.toString()}
            onChangeText={(value) => setLightnessThreshold(parseInt(value))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Pixel Sampling (1/n):</Text>
          <TextInput
            style={styles.input}
            value={pixelSampling.toString()}
            onChangeText={(value) => setPixelSampling(parseInt(value))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Auto Capture Interval (seconds):</Text>
          <TextInput
            style={styles.input}
            value={autoCaptureInterval.toString()}
            onChangeText={(value) => setAutoCaptureInterval(parseInt(value))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Number of Photos:</Text>
          <TextInput
            style={styles.input}
            value={numPhotos.toString()}
            onChangeText={(value) => setNumPhotos(parseInt(value))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Delay Between Photos (ms):</Text>
          <TextInput
            style={styles.input}
            value={photoDelay.toString()}
            onChangeText={(value) => setPhotoDelay(parseInt(value))}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '50%',
  },
  controlsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00c8ff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  photo: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedPhoto: {
    borderWidth: 2,
    borderColor: '#00c8ff',
  },
  lightnessContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  lightnessText: {
    color: '#fff',
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  inputLabel: {
    color: '#fff',
    marginRight: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    width: 50,
  },
});

export default CameraCapture;
