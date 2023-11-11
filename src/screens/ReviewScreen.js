// src/screens/ReviewScreen.js
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { getReviewsForMovie } from "../firebase/database";
import ReviewCard from "../components/ReviewCard";

const ReviewScreen = ({ route }) => {
  const [reviews, setReviews] = useState([]);
  const movieId = route.params?.movieId;

  useEffect(() => {
    const fetchReviews = async () => {
      if (!movieId) {
        console.error("No movieId provided");
        return;
      }

      try {
        const fetchedReviews = await getReviewsForMovie(String(movieId)); // Ensure movieId is a string
        console.log("Fetched reviews:", fetchedReviews); // Debug log
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (!movieId) {
    return <Text>No movie ID provided</Text>;
  }

  if (reviews.length === 0) {
    return <Text>No reviews available for this movie</Text>; // Display message if no reviews
  }

  return (
    <ScrollView style={styles.container}>
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});

export default ReviewScreen;
