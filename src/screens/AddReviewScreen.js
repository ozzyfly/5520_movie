import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase/config";
import { addReviewToMovie } from "../firebase/database";

const AddReviewScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [reviewText, setReviewText] = useState("");

  const handleAddReview = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("No user is signed in.");
      }
      await addReviewToMovie(String(movieId), userId, reviewText);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
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
