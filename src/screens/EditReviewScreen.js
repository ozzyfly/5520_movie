import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getReviewDocument,
  updateReviewDocument,
  deleteReviewDocument,
  uploadImageToFirebase,
} from "../firebase/database";
import ImageManager from "../components/ImageManager";

const EditReviewScreen = ({ route, navigation }) => {
  const [reviewText, setReviewText] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const { reviewId, movieId } = route.params;

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const reviewData = await getReviewDocument(movieId, reviewId);
        if (reviewData) {
          setReviewText(reviewData.text);
          setImageUri(reviewData.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
        Alert.alert("Error", "Could not fetch review data.");
      }
    };
    fetchReview();
  }, [reviewId, movieId]);

  const handleSave = async () => {
    try {
      let imageUrl = imageUri;
      if (imageUri && imageUri.startsWith("file://")) {
        imageUrl = await uploadImageToFirebase(imageUri);
      }

      const updatedReview = {
        text: reviewText,
        imageUrl: imageUrl,
      };

      await updateReviewDocument(movieId, reviewId, updatedReview);
      Alert.alert("Success", "Review updated successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating review:", error);
      Alert.alert("Error", "Could not update review.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReviewDocument(movieId, reviewId);
      navigation.goBack(); // Navigate back after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
      Alert.alert("Error", "Could not delete review.");
    }
  };

  const handleCancelEdit = () => {
    navigation.goBack(); // Go back to previous screen without making changes
  };

  const removeImage = () => {
    setImageUri(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
          <Ionicons name="trash-bin" size={24} color="red" />
        </TouchableOpacity>
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
        <TextInput
          style={styles.textInput}
          multiline
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="Write your review..."
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelEdit}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  },
  deleteIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  reviewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditReviewScreen;
