// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
import { getUserData } from "../firebase/database";
import { signOut } from "../firebase/auth";
import { auth, db } from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);

      unsubscribe = onSnapshot(
        userRef,
        (doc) => {
          if (doc.exists()) {
            setUserData({ id: doc.id, ...doc.data() }); // Include the document ID
          } else {
            console.log("No such document!");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching user data: ", error);
          Alert.alert("Error", "Could not fetch user data.");
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }

    return () => unsubscribe();
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
    return <ActivityIndicator />;
  }

  // If no user data is found, it likely means we're not logged in.
  if (!userData) {
    return (
      <View>
        <Text>User not found, please log in again.</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Name: {userData?.name}</Text>
      <Text>Email: {userData?.email}</Text>
      <Button title="Edit Profile" onPress={handleEditProfilePress} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
