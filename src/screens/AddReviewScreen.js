import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { auth, storage } from "../firebase/config";
import { addReviewToMovie } from "../firebase/database";
import ImageManager from "../components/ImageManager";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Ionicons } from "@expo/vector-icons";

const AddReviewScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [reviewText, setReviewText] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const uploadImageToFirebase = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `review_images/${Date.now()}`);
      const uploadTask = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      throw error;
    }
  };

  const handleAddReview = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("No user is signed in.");

      let imageUrl = null;
      if (imageUri) {
        imageUrl = await uploadImageToFirebase(imageUri);
      }

      await addReviewToMovie(movieId, userId, reviewText, imageUrl);
      navigation.goBack();
    } catch (error) {
      console.error("Error in handleAddReview:", error);
      Alert.alert("Error", error.message);
    }
  };

  const removeImage = () => {
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Write your review..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      <ImageManager onImageTaken={setImageUri} />
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.reviewImage} />
          <TouchableOpacity
            onPress={removeImage}
            style={styles.removeImageButton}
          >
            <Ionicons name="close-circle" size={24} color="#ff5252" />
            {/* Text component removed */}
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    height: 150,
    marginBottom: 20,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  imagePreviewContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  previewImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  removeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  removeImageButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  removeImageText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddReviewScreen;
