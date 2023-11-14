import React, { useState } from "react";
import { View, Image, Button, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ passImageUri }) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
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
        // Updated key usage
        setImageUri(result.assets[0].uri);
        passImageUri(result.assets[0].uri);
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
