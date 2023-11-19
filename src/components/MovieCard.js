import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const MovieCard = ({ movie, navigation }) => {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : DEFAULT_IMAGE_URL;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDetails", { movieId: movie.id })}
      style={styles.container}
    >
      <Image source={{ uri: posterPath }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 225,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MovieCard;
