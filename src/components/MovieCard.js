import React from "react";
import { View, Text, Image } from "react-native";

const MovieCard = ({ movie }) => {
  return (
    <View>
      <Image source={{ uri: movie.posterPath }} />
      <Text>{movie.title}</Text>
      {/* Other movie details */}
    </View>
  );
};

export default MovieCard;
