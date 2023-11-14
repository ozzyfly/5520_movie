import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getUserDocument, getMovieTitleById } from "../firebase/database";
import { signOut } from "../firebase/auth";
import { auth } from "../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [favoriteMovieTitles, setFavoriteMovieTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndMovieData = async () => {
      setLoading(true);
      if (auth.currentUser) {
        try {
          const userData = await getUserDocument(auth.currentUser.uid);
          if (userData && userData.favoriteMovies) {
            const titles = await Promise.all(
              userData.favoriteMovies.map((id) =>
                getMovieTitleById(id.toString())
              )
            );
            setFavoriteMovieTitles(titles);
            setUserData(userData);
          }
        } catch (error) {
          console.error("Error fetching user and movie data:", error);
          Alert.alert("Error", "Could not fetch user and movie data.");
        }
      }
      setLoading(false);
    };

    fetchUserAndMovieData();
  }, []);

  const handleEditProfilePress = () => {
    if (!userData || !userData.id) {
      Alert.alert("Error", "User data is incomplete. Cannot edit profile.");
      return;
    }
    navigation.navigate("EditProfileScreen", { userData: userData });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (error) {
      Alert.alert("Logout Error", "Unable to logout. Please try again.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          User not found, please log in again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile Information</Text>
      <Text style={styles.userInfoText}>Name: {userData?.name}</Text>
      <Text style={styles.userInfoText}>Email: {userData?.email}</Text>
      <Text style={styles.userInfoText}>
        Favorite Movies: {favoriteMovieTitles.join(", ")}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEditProfilePress}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    alignSelf: "center",
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
