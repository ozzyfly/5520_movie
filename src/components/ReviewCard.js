// ReviewCard.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { getUserDocument, updateReviewDocument } from "../firebase/database"; // Import the updateReviewDocument function

const ReviewCard = ({ review, isUserReview }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedReviewText, setEditedReviewText] = useState(review.text);
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await getUserDocument(review.userId);
        setUserName(userData.name); // Assuming the user's name is stored under a 'name' field
      } catch (error) {
        console.error("Error fetching user name:", error);
        setUserName("Unknown User"); // Fallback text
      }
    };

    fetchUserName();
  }, [review.userId]);

  const handleSave = async () => {
    try {
      await updateReviewDocument(review.id, { text: editedReviewText });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const createdAtDate = review.createdAt.seconds
    ? new Date(review.createdAt.seconds * 1000).toLocaleDateString()
    : "Unknown date";

  return (
    <View style={styles.card}>
      <Text style={styles.criticName}>{userName}</Text>
      {editMode ? (
        <>
          <TextInput
            style={styles.reviewInput}
            onChangeText={setEditedReviewText}
            value={editedReviewText}
          />
          <Button title="Save" onPress={handleSave} />
        </>
      ) : (
        <>
          <Text style={styles.reviewContent}>{review.text}</Text>
          <Text style={styles.reviewDate}>{createdAtDate}</Text>
          {isUserReview && (
            <Button title="Edit" onPress={() => setEditMode(true)} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  criticName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  reviewContent: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: "#666666",
    textAlign: "right",
  },
  reviewInput: {
    fontSize: 14,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
});
export default ReviewCard;
