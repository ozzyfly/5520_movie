import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { getMoviesWithReviews, getReviewsForMovie } from "../firebase/database";

const ReviewListScreen = ({ navigation }) => {
  const [moviesWithReviews, setMoviesWithReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigateToReviewScreen = (movieId) => {
    navigation.navigate("ReviewScreen", { movieId });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMoviesWithReviews();
        const moviesWithReviewsData = await Promise.all(
          movies.map(async (movie) => {
            const reviews = await getReviewsForMovie(movie.id.toString());
            return { ...movie, reviews };
          })
        );
        setMoviesWithReviews(moviesWithReviewsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading movies: {error.message}</Text>;
  }

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToReviewScreen(item.id)}
      style={styles.movieItem}
    >
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieSubText}>View Reviews</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={moviesWithReviews}
      renderItem={renderMovieItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
    />
  );
};
const styles = StyleSheet.create({
  list: {
    backgroundColor: "#f0f0f0",
  },
  movieItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  movieSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
export default ReviewListScreen;
