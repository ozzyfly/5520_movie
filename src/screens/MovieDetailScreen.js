import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MovieDetailScreen = ({ route }) => {
  const { movieTitle } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://via.placeholder.com/300" }}
      />
      <Text style={styles.title}>{movieTitle}</Text>
      <Text style={styles.description}>
        Placeholder for movie description. Later, this can be fetched from the
        TMDB API.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
  },
});

export default MovieDetailScreen;
