// src/screens/AddReviewScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
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
      await addReviewToMovie(String(movieId), userId, reviewText); // Ensure movieId is a string
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Write your review..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      <Button title="Submit Review" onPress={handleAddReview} />
    </View>
  );
};

export default AddReviewScreen;
