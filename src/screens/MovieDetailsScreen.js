// src/screens/MovieDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import styles from "../styles/general";
import typography from "../styles/typography";
import { fetchMovieDetails } from "../utilities/tmdbAPI";

function MovieDetailsScreen({ route }) {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchMovieDetails(movieId);
      setMovieDetails(details);
    };
    fetchDetails();
  }, [movieId]);

  if (!movieDetails) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Function to convert minutes to hours and minutes
  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
        }}
        style={detailStyles.poster}
      />
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
      {/* You can add more details like directors, cast, etc., here */}
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
