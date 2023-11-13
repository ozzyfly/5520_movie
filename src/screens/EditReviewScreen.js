import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getReviewDocument, updateReviewDocument } from "../firebase/database";

const EditReviewScreen = ({ route, navigation }) => {
  const [reviewText, setReviewText] = useState("");
  const { reviewId, movieId } = route.params;

  useEffect(() => {
    // Debug: Log the movieId and reviewId to ensure they are passed correctly
    console.log("EditReviewScreen params:", route.params);

    // Handle the absence of movieId
    if (!movieId) {
      console.error("No movieId provided");
      Alert.alert("Error", "No movie ID provided.");
      return; // Exit the useEffect hook early
    }

    const fetchReview = async () => {
      try {
        console.log(
          `Fetching review with ID: ${reviewId} for movie ID: ${movieId}`
        ); // Debug
        const reviewData = await getReviewDocument(movieId, reviewId);
        console.log("Fetched review data:", reviewData); // Debug
        if (reviewData) {
          setReviewText(reviewData.text);
        } else {
          console.error("Review data is undefined");
          Alert.alert("Error", "Review data not found.");
        }
      } catch (error) {
        console.error("Error fetching review in EditReviewScreen:", error);
        Alert.alert("Error", "Could not fetch review data.");
      }
    };

    fetchReview();
  }, [reviewId, movieId]);

  const handleSave = async () => {
    try {
      console.log(
        `Saving review with ID: ${reviewId} for movie ID: ${movieId}`
      ); // Debug
      await updateReviewDocument(movieId, reviewId, { text: reviewText });
      navigation.goBack();
    } catch (error) {
      console.error("Error updating review:", error);
      Alert.alert("Error", "Could not update review.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={reviewText}
        onChangeText={setReviewText}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
});

export default EditReviewScreen;
