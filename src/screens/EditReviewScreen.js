import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getReviewDocument,
  updateReviewDocument,
  deleteReviewDocument,
} from "../firebase/database";

const EditReviewScreen = ({ route, navigation }) => {
  const [reviewText, setReviewText] = useState("");
  const { reviewId, movieId } = route.params;

  useEffect(() => {
    console.log("EditReviewScreen mounted. Params:", route.params);

    if (!movieId) {
      console.error("No movieId provided");
      Alert.alert("Error", "No movie ID provided.");
      return;
    }

    const fetchReview = async () => {
      try {
        console.log(
          `Fetching review with ID: ${reviewId} for movie ID: ${movieId}`
        );
        const reviewData = await getReviewDocument(movieId, reviewId);
        console.log("Fetched review data:", reviewData);

        if (reviewData) {
          setReviewText(reviewData.text);
        } else {
          console.error("Review data is undefined or not found");
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
      );
      await updateReviewDocument(movieId, reviewId, { text: reviewText });
      console.log("Review update successful");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating review:", error);
      Alert.alert("Error", "Could not update review.");
    }
  };

  const handleDelete = async () => {
    try {
      console.log(`Deleting review with ID: ${reviewId}`);
      await deleteReviewDocument(movieId, reviewId);
      console.log("Review deletion successful");
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting review:", error);
      Alert.alert("Error", "Could not delete review.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
          <Ionicons name="trash-bin" size={24} color="red" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          multiline
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="Write your review..."
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditReviewScreen;
