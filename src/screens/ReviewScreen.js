import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { getReviewsForMovie } from "../firebase/database";
import ReviewCard from "../components/ReviewCard";
import { getUserInfo } from "../firebase/auth";

const ReviewScreen = ({ route, navigation }) => {
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const movieId = route.params?.movieId;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await getUserInfo();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCurrentUser();
    const fetchReviews = async () => {
      if (!movieId) {
        console.error("No movieId provided");
        return;
      }

      try {
        const fetchedReviews = await getReviewsForMovie(String(movieId));
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (!movieId) {
    return <Text style={styles.noDataText}>No movie ID provided</Text>;
  }

  if (reviews.length === 0) {
    return (
      <Text style={styles.noDataText}>No reviews available for this movie</Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          currentUser={currentUser}
          navigation={navigation}
          movieId={movieId} // Pass movieId as a prop
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ReviewScreen;
