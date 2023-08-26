import { Camera, CameraType, FlashMode } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
import Flash from "./Flash";

const CameraFunc = (props) => {
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isFlash, setIsFlash] = useState(false);
  const [type, setType] = useState(CameraType.back);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { setIsCamera } = props;

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    setIsCamera(false);
    return;
  }

  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();
      setPicture(image.uri);
    }
  };

  const savePicture = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(picture);
    }

    setPicture(null);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {picture ? (
        <Image
          source={{ uri: picture }}
          style={styles.capturedImg}
          resizeMode="stretch"
        />
      ) : (
        <>
          <View style={styles.topMenu}>
            <Flash isFlash={isFlash} setIsFlash={setIsFlash} />
          </View>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              setCamera(ref);
            }}
            focusDepth={0}
            flashMode={isFlash ? FlashMode.torch : FlashMode.off}
          />
        </>
      )}
      <View style={styles.buttonContainer}>
        {picture ? (
          <>
            <TouchableOpacity onPress={() => setPicture(null)}>
              <Text style={styles.text}>❌</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 50 }} onPress={savePicture}>
              <Text style={styles.text}>⭕️</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={takePicture}>
              <Ionicons name="ios-camera-outline" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 50 }}
              onPress={toggleCameraType}
            >
              <Ionicons
                name="ios-camera-reverse-sharp"
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  topMenu: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  camera: {
    flex: 5,
    aspectRatio: 3 / 4,
  },
  capturedImg: {
    flex: 6,
    aspectRatio: 3 / 4.8,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    backgroundColor: "red",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  cameraBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 50,
  },
});

export default CameraFunc;
