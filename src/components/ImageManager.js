import React, { useState } from "react";
import { View, Image, Button, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../firebase/config"; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ImageManager({ onImageTaken }) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profile_pics/${Date.now()}`); // Create a reference

    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("Permission required", "You need to grant camera access.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      if (!result.cancelled) {
        const downloadUrl = await uploadImage(result.assets[0].uri);
        onImageTaken(downloadUrl);
      }
    } catch (err) {
      console.error("Error taking image: ", err);
      Alert.alert("Error", "Could not take image.");
    }
  };

  return (
    <View>
      <Button onPress={takeImageHandler} title="Take an Image" />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
