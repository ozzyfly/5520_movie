import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { fetchMovieDetails } from "../utilities/tmdbAPI";
import { getMoviesWithReviews, getReviewsForMovie } from "../firebase/database";
import { useFocusEffect } from "@react-navigation/native";

const ReviewListScreen = ({ navigation }) => {
  const [moviesWithReviews, setMoviesWithReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigateToReviewScreen = (movieId) => {
    navigation.navigate("ReviewScreen", { movieId: String(movieId) });
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchMovies = async () => {
        try {
          setLoading(true);
          const movies = await getMoviesWithReviews();
          const moviesWithDetails = await Promise.all(
            movies.map(async (movie) => {
              const reviews = await getReviewsForMovie(movie.id.toString());
              if (reviews.length > 0) {
                const movieDetails = await fetchMovieDetails(movie.id); // Fetch additional details
                return { ...movie, reviews, ...movieDetails };
              }
              return null;
            })
          );
          const filteredMoviesWithDetails = moviesWithDetails.filter(
            (movie) => movie !== null
          );
          setMoviesWithReviews(filteredMoviesWithDetails);
        } catch (err) {
          console.error("Error fetching movies:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
      return () => {}; // Cleanup function, if needed
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading movies: {error.message}</Text>;
  }

  const renderReviewPreview = (reviews) => {
    if (reviews.length === 0) return <Text>No Reviews</Text>;
    return <Text>{reviews[0].text.slice(0, 50)}...</Text>;
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToReviewScreen(item.id)}
      style={styles.movieItem}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <View style={styles.reviewPreview}>
          {renderReviewPreview(item.reviews)}
        </View>
        <TouchableOpacity
          onPress={() => navigateToReviewScreen(item.id)}
          style={styles.viewAllButton}
        >
          <Text>View All Reviews</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center", // Align items in a row
  },
  movieImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  movieInfo: {
    flex: 1,
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  movieSubText: {
    fontSize: 14,
    color: "#666",
  },
});
export default ReviewListScreen;
