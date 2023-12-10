import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

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
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 225,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

export default MovieCard;
