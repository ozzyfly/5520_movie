import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { auth, storage } from "../firebase/config";
import { addReviewToMovie } from "../firebase/database";
import ImageManager from "../components/ImageManager";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
      console.log("Uploaded image URL:", downloadURL); // Debug line
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
        console.log("Image URL to be saved:", imageUrl); // Debug line
      }

      console.log("Review text:", reviewText); // Debug line
      await addReviewToMovie(movieId, userId, reviewText, imageUrl);
      navigation.goBack();
    } catch (error) {
      console.error("Error in handleAddReview:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageManager onImageTaken={setImageUri} />
      <TextInput
        style={styles.textInput}
        placeholder="Write your review..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
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
});

export default AddReviewScreen;
