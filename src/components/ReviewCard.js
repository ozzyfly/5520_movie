// ReviewCard.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getUserDocument } from "../firebase/database"; // Import the getUserDocument function

const ReviewCard = ({ review }) => {
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

  const createdAtDate = review.createdAt.seconds
    ? new Date(review.createdAt.seconds * 1000).toLocaleDateString() // Already a string
    : "Unknown date";

  return (
    <View style={styles.card}>
      <Text style={styles.criticName}>{userName}</Text>
      <Text style={styles.reviewContent}>{review.text}</Text>
      <Text style={styles.reviewDate}>{createdAtDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  criticName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  reviewContent: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#666666",
    textAlign: "right",
  },
});

export default ReviewCard;
