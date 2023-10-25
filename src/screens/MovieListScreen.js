import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const data = [
  { id: "1", title: "Movie A" },
  { id: "2", title: "Movie B" },
  // ... Add more dummy data
];

const MovieListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Popular Movies</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    padding: 20,
    fontSize: 18,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
});

export default MovieListScreen;
