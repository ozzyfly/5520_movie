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
import NotificationManager from "./NotificationManager";

const ProfileScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const [favoriteMovieTitles, setFavoriteMovieTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserAndMovieData = async () => {
        setLoading(true);
        try {
          const updatedUserData = route.params?.updatedUserData;
          let userDataToUse = userData;

          if (updatedUserData) {
            setUserData(updatedUserData);
            userDataToUse = updatedUserData;
          } else if (auth.currentUser) {
            const fetchedUserData = await getUserDocument(auth.currentUser.uid);
            setUserData(fetchedUserData);
            userDataToUse = fetchedUserData;
          }

          if (userDataToUse && userDataToUse.favoriteMovies) {
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
      <View style={styles.profilePicContainer}>
        <Image
          source={
            userData?.profilePic
              ? { uri: userData.profilePic }
              : require("../assets/images/OIP.jpeg")
          }
          style={styles.profilePic}
        />
      </View>
      <Text style={styles.userInfoText}>Name: {userData?.name}</Text>
      <Text style={styles.userInfoText}>Email: {userData?.email}</Text>
      <View style={styles.favoriteMoviesContainer}>
        <Text style={styles.headerText}>Favorite Movies:</Text>
        {favoriteMovieTitles.length > 0 ? (
          favoriteMovieTitles.map((title, index) => (
            <Text key={index} style={styles.favoriteMovieTitle}>
              {index + 1}. {title}
            </Text>
          ))
        ) : (
          <Text style={styles.noDataText}>No favorite movies added.</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEditProfilePress}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <NotificationManager />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    alignItems: "center",
  },
  profilePicContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 30,
    borderWidth: 3,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    overflow: "hidden",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  favoriteMoviesContainer: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  favoriteMovieTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default ProfileScreen;
