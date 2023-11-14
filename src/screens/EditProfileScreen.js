// EditProfileScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { updateUserDocument, getMovieTitleById } from "../firebase/database";
import ImageManager from "../components/ImageManager";

const EditProfileScreen = ({ route, navigation }) => {
  const userData = route.params?.userData;
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [favoriteMovies, setFavoriteMovies] = useState(
    userData?.favoriteMovies || []
  );
  const [favoriteMovieTitles, setFavoriteMovieTitles] = useState([]);
  const [profilePic, setProfilePic] = useState(userData?.profilePic || "");

  useEffect(() => {
    const fetchMovieTitles = async () => {
      try {
        const titles = await Promise.all(
          favoriteMovies.map(async (id) => {
            const title = await getMovieTitleById(id.toString());
            return title !== "Unknown Movie" ? title : `Movie ID: ${id}`;
          })
        );
        setFavoriteMovieTitles(titles);
      } catch (error) {
        console.error("Error fetching movie titles:", error);
      }
    };

    if (favoriteMovies.length) {
      fetchMovieTitles();
    }
  }, [favoriteMovies]);

  const handleSaveProfile = async () => {
    if (!userData?.id) {
      Alert.alert("Error", "No userId provided");
      return;
    }
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Name and email cannot be empty.");
      return;
    }

    try {
      await updateUserDocument(userData.id, {
        name,
        email,
        favoriteMovies,
        profilePic,
      });
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error updating profile",
        error.message || "An unknown error occurred"
      );
    }
  };

  const removeMovie = (movieId) => {
    setFavoriteMovies(favoriteMovies.filter((id) => id !== movieId));
  };

  const renderMovieItem = ({ item, index }) => (
    <View style={styles.movieItem}>
      <Text>{item}</Text>
      <TouchableOpacity onPress={() => removeMovie(favoriteMovies[index])}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleImage = (uri) => {
    setProfilePic(uri);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />

      <FlatList
        data={favoriteMovieTitles}
        renderItem={renderMovieItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <Text style={styles.headerText}>Favorite Movies:</Text>
        }
      />
      <ImageManager passImageUri={handleImage} />
      <Button title="Save Profile" onPress={handleSaveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  movieItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
  },
  deleteText: {
    color: "red",
  },
  headerText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default EditProfileScreen;
