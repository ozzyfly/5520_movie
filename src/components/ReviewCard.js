import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getUserDocument } from "../firebase/database";

const ReviewCard = ({ review, currentUser, navigation, movieId }) => {
  const [userName, setUserName] = useState("Loading...");

  const handleReviewPress = () => {
    console.log("Review Pressed, currentUser:", currentUser);
    console.log("Review User ID:", review.userId);
    if (currentUser && review.userId === currentUser.id) {
      if (!movieId) {
        console.error("movieId is undefined");
        // Handle the error appropriately, maybe with an alert or error message
        return;
      }
      navigation.navigate("EditReviewScreen", {
        reviewId: review.id,
        movieId: movieId,
      });
    } else {
      console.log("Not a user review or currentUser is undefined");
    }
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await getUserDocument(review.userId);
        setUserName(userData.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
        setUserName("Unknown User");
      }
    };

    fetchUserName();
  }, [review.userId]);

  const createdAtDate = review.createdAt.seconds
    ? new Date(review.createdAt.seconds * 1000).toLocaleDateString()
    : "Unknown date";

  return (
    <TouchableOpacity onPress={handleReviewPress} style={styles.card}>
      <Text style={styles.criticName}>{userName}</Text>
      <Text style={styles.reviewContent}>{review.text}</Text>
      <Text style={styles.reviewDate}>{createdAtDate}</Text>
    </TouchableOpacity>
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
});

export default ReviewCard;
