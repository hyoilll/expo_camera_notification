import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CameraFunc from "./components/camera/CameraFunc";
import NoticeFunc from "./components/notice/NoticeFunc";

export default function App() {
  const [isCamera, setIsCamera] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isCamera ? (
        <CameraFunc setIsCamera={setIsCamera} />
      ) : (
        // <VisionCamera />
        <TouchableOpacity
          onPress={() => setIsCamera(true)}
          style={styles.cameraBtn}
        >
          <Text>⭐️</Text>
        </TouchableOpacity>
      )}
      {/* <NoticeFunc /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 50,
  },
});
