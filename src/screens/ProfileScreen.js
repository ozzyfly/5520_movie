import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { getUserDocument, getMovieTitleById } from "../firebase/database";
import { signOut } from "../firebase/auth";
import { auth } from "../firebase/config";

const ProfileScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [favoriteMovieTitles, setFavoriteMovieTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserAndMovieData = async () => {
        console.log("Fetching user and movie data");
        setLoading(true);
        try {
          const updatedUserData = route.params?.updatedUserData;
          let userDataToUse = userData;

          if (updatedUserData) {
            console.log("Using updated user data from EditProfileScreen");
            setUserData(updatedUserData);
            userDataToUse = updatedUserData;
          } else if (auth.currentUser) {
            console.log("Fetching user data from Firebase");
            const fetchedUserData = await getUserDocument(auth.currentUser.uid);
            setUserData(fetchedUserData);
            userDataToUse = fetchedUserData;
          }

          // Fetch movie titles
          if (userDataToUse && userDataToUse.favoriteMovies) {
            console.log("Fetching movie titles");
            const titles = await Promise.all(
              userDataToUse.favoriteMovies.map((id) =>
                getMovieTitleById(id.toString())
              )
            );
            setFavoriteMovieTitles(titles);
          }
        } catch (error) {
          console.error("Error fetching user and movie data:", error);
          Alert.alert("Error", "Could not fetch user and movie data.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserAndMovieData();
    }, [route.params?.updatedUserData])
  );

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
      <Image
        source={
          userData?.profilePic
            ? { uri: userData.profilePic }
            : require("../assets/images/OIP.jpeg") // Update this line
        }
        style={styles.profilePic}
      />
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
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: "#4CAF50", // Changed color
    padding: 15,
    borderRadius: 30,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10, // Added padding
  },
  noDataText: {
    fontSize: 18, // Increased font size
    color: "#333", // Changed color
    textAlign: "center",
    marginTop: 20,
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
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default ProfileScreen;
