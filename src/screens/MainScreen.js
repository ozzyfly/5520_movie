import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import styles from "../styles/general";
import typography from "../styles/typography";
import { fetchTrendingMovies, fetchNewReleases } from "../utilities/tmdbAPI";
import MovieCard from "../components/MovieCard";

function MainScreen({ navigation }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trending = await fetchTrendingMovies();
      const newReleases = await fetchNewReleases();
      setTrendingMovies(trending);
      setNewReleases(newReleases);
    };
    fetchMovies();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={[typography.title, styles.header]}>All About Movies</Text>
      <View>
        <Text style={typography.sectionTitle}>Trending Movies</Text>
        <FlatList
          data={trendingMovies}
          renderItem={({ item }) => (
            <MovieCard movie={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </View>
      <View>
        <Text style={typography.sectionTitle}>New Releases</Text>
        <FlatList
          data={newReleases}
          renderItem={({ item }) => (
            <MovieCard movie={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </View>
    </ScrollView>
  );
}

export default MainScreen;
