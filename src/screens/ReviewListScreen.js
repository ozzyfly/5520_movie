import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const data = [
  { id: "1", review: "Great movie!" },
  { id: "2", review: "It was okay." },
  // ... Add more dummy data
];

const ReviewListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Movie Reviews</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.review}</Text>
        )}
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

export default ReviewListScreen;
