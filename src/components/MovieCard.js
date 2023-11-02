// src/components/MovieCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { DEFAULT_IMAGE_URL } from "../utilities/constants";

const MovieCard = ({ movie }) => {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : DEFAULT_IMAGE_URL;

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: posterPath }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>
      {/* You can add more movie details here */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    margin: 10,
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
  },
});

export default MovieCard;
