// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
import { getUserData } from "../firebase/database";
import { signOut } from "../firebase/auth"; // Make sure this path is correct

const ProfileScreen = ({ navigation }) => {
  const userId = "user_id"; // Replace with actual user ID retrieval logic
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(userId);
      setUserData(data);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const handleEditProfilePress = () => {
    navigation.navigate("EditProfileScreen", { userData: userData });
  };

  // Add the logout functionality
  const handleLogout = async () => {
    try {
      await signOut();
      // Navigate to the login screen or reset the navigation state as necessary
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Logout Error", "Unable to logout. Please try again.");
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>Name: {userData?.name}</Text>
      <Text>Email: {userData?.email}</Text>
      <Button title="Edit Profile" onPress={handleEditProfilePress} />
      {/* Add a logout button */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
