import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, FlatList } from "react-native";
import styles from "../styles/general";
import typography from "../styles/typography";
import { fetchTrendingMovies, fetchNewReleases } from "../utilities/tmdbAPI";
import MovieCard from "../components/MovieCard";
import { getUserInfo } from "../firebase/auth";

function MainScreen({ navigation }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await getUserInfo();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCurrentUser();

    const fetchMovies = async () => {
      const trending = await fetchTrendingMovies();
      const newReleases = await fetchNewReleases();
      setTrendingMovies(trending);
      setNewReleases(newReleases);
    };
    fetchMovies();
  }, []);

  return (
    <ScrollView style={[styles.container, { padding: 20 }]}>
      <Text style={[typography.header1, { marginBottom: 20 }]}>
        All About Movies
      </Text>
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
      <View style={{ marginTop: 20 }}>
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
