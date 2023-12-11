import React, { useState, useEffect } from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getUserDocument } from "../firebase/database";
import { Ionicons } from "@expo/vector-icons";

const ReviewCard = ({
  review,
  currentUser,
  isUserReview,
  navigation,
  movieId,
}) => {
  const [userName, setUserName] = useState("Loading...");

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

  const navigateToEditScreen = () => {
    if (isUserReview) {
      navigation.navigate("EditReviewScreen", {
        reviewId: review.id,
        movieId: movieId,
      });
    }
  };

  return (
    <TouchableOpacity onPress={navigateToEditScreen} style={styles.card}>
      <Text style={styles.criticName}>{userName}</Text>
      <Text style={styles.reviewContent}>{review.text}</Text>
      {review.imageUrl ? (
        <Image source={{ uri: review.imageUrl }} style={styles.reviewImage} />
      ) : (
        <Text>No image provided</Text>
      )}
      <Text style={styles.reviewDate}>{createdAtDate}</Text>
      {isUserReview && (
        <TouchableOpacity
          onPress={navigateToEditScreen}
          style={styles.iconContainer}
        >
          <Ionicons name="ios-pencil" size={24} color="black" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: "#000",
    shadowOffset: { height: 3, width: 0 },
    elevation: 5,
  },
  criticName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  reviewContent: {
    fontSize: 15,
    color: "#444",
    marginBottom: 8,
  },
  reviewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    marginTop: 8,
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 12,
  },
});

export default ReviewCard;
