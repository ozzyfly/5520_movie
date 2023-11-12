import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { getUserDocument } from "../firebase/database";
import { signOut } from "../firebase/auth";
import { auth } from "../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const data = await getUserDocument(auth.currentUser.uid);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          Alert.alert("Error", "Could not fetch user data.");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleEditProfilePress = () => {
    if (!userData || !userData.id) {
      Alert.alert("Error", "User data is incomplete. Cannot edit profile.");
      return;
    }
    navigation.navigate("EditProfileScreen", { userData: userData });
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      await signOut();
      // Navigate to the login screen or reset the navigation state as necessary
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
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
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userInfoText}>Name: {userData?.name}</Text>
      <Text style={styles.userInfoText}>Email: {userData?.email}</Text>
      {/* Add more user context here if needed */}
      <View style={styles.buttonContainer}>
        <Button title="Edit Profile" onPress={handleEditProfilePress} />
        <Button title="Logout" onPress={handleLogout} color="red" />
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
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ProfileScreen;
