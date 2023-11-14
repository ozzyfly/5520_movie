import React, { useEffect, useState } from "react";
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
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieSubText}>View Reviews</Text>
        {/* You can add more details here like release date, rating, etc. */}
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
