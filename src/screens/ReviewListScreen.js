// src/screens/ReviewListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const ReviewListScreen = ({ navigation }) => {
  // Assuming you have a function getMoviesWithReviews that fetches movies
  const [moviesWithReviews, setMoviesWithReviews] = useState([]);

  useEffect(() => {
    const fetchMoviesWithReviews = async () => {
      const movies = await getMoviesWithReviews();
      setMoviesWithReviews(movies);
    };

    fetchMoviesWithReviews();
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MovieDetailsScreen", { movieId: item.id })
      }
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={moviesWithReviews}
      renderItem={renderMovieItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ReviewListScreen;
