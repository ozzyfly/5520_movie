import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MoviePlaceholder = ({ title }) => {
  const [isFavorited, setFavorited] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://via.placeholder.com/150" }}
      />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => setFavorited(!isFavorited)}>
        <Ionicons
          name={isFavorited ? "heart" : "heart-outline"}
          size={24}
          color={isFavorited ? "red" : "grey"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
});

export default MoviePlaceholder;
