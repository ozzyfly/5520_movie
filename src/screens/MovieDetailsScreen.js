import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/general";
import typography from "../styles/typography";
import { fetchMovieDetails } from "../utilities/tmdbAPI";
import {
  saveMovieDetailsToFirestore,
  updateUserDocument,
  getUserDocument,
} from "../firebase/database";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase/config";

function MovieDetailsScreen({ route, navigation }) {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = auth.currentUser.uid;
  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchMovieDetails(movieId);
      setMovieDetails(details);
      saveMovieDetailsToFirestore(details); // Saving details to Firestore
    };

    fetchDetails();

    const checkFavoriteStatus = async () => {
      const userData = await getUserDocument(userId);
      setIsFavorite(userData.favoriteMovies?.includes(movieId));
    };

    checkFavoriteStatus();
  }, [movieId, userId]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color="red"
          onPress={toggleFavorite}
        />
      ),
    });
  }, [isFavorite, navigation]);

  const toggleFavorite = async () => {
    try {
      const userData = await getUserDocument(userId);
      let updatedFavorites = userData.favoriteMovies || [];
      if (isFavorite) {
        updatedFavorites = updatedFavorites.filter((id) => id !== movieId);
      } else {
        updatedFavorites.push(movieId);
      }
      await updateUserDocument(userId, { favoriteMovies: updatedFavorites });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  if (!movieDetails) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
        }}
        style={detailStyles.poster}
      />
      <Text style={typography.subtitle}>
        Runtime: {formatRuntime(movieDetails.runtime)}
      </Text>
      <Text style={[typography.title, detailStyles.title]}>
        {movieDetails.title}
      </Text>
      <Text style={typography.subtitle}>
        Release date: {movieDetails.release_date}
      </Text>
      <Text style={typography.subtitle}>
        Runtime: {formatRuntime(movieDetails.runtime)}
      </Text>
      <Text style={typography.subtitle}>
        Rating: {movieDetails.vote_average}/10
      </Text>
      <View style={detailStyles.genreContainer}>
        {movieDetails.genres.map((genre) => (
          <Text key={genre.id} style={detailStyles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
      <Text style={typography.text}>{movieDetails.overview}</Text>
      <Button
        title="View Reviews"
        onPress={() =>
          navigation.navigate("ReviewScreen", { movieId: String(movieId) })
        }
      />
      <Button
        title="Add Review"
        onPress={() =>
          navigation.navigate("AddReviewScreen", {
            movieId: String(movieDetails.id),
          })
        }
      />
    </ScrollView>
  );
}

const detailStyles = StyleSheet.create({
  poster: {
    width: "100%",
    height: 300,
  },
  title: {
    marginVertical: 10,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  genre: {
    marginRight: 5,
    fontWeight: "bold",
  },
});

export default MovieDetailsScreen;
