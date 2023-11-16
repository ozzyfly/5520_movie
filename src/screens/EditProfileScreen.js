import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
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

  const handleImageUpload = async (downloadUrl) => {
    setProfilePic(downloadUrl);
  };

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
      const updatedUserData = {
        name,
        email,
        favoriteMovies,
        profilePic,
      };
      await updateUserDocument(userData.id, updatedUserData);
      navigation.navigate("ProfileScreen", { updatedUserData });
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
      <ImageManager onImageTaken={handleImageUpload} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  movieItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfileScreen;
