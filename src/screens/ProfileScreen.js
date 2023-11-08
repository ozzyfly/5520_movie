import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import { getUserData } from "../firebase/database"; // adjust the path as necessary
import colors from "../styles/colors";
import typography from "../styles/typography";
import general from "../styles/general";

const ProfileScreen = ({ navigation, route }) => {
  // Assuming the user ID is passed through route params or some global state/context
  const userId = route.params?.userId; // Replace with actual user ID source
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(userId);
        setUserData(data);
      } catch (error) {
        console.error(error);
        // Optionally, handle the error state here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  // Assuming 'EditProfileScreen' is a screen where users can update their profile details
  const handleEditProfilePress = () => {
    navigation.navigate("EditProfileScreen", { userId: userId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      {/* Display user data */}
      <Text style={styles.text}>Name: {userData?.name}</Text>
      <Text style={styles.text}>Email: {userData?.email}</Text>
      {/* Navigate to edit profile screen */}
      <CustomButton title="Edit Profile" onPress={handleEditProfilePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...general.container,
    ...general.center,
  },
  header: {
    ...typography.header1,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  text: {
    ...typography.paragraph,
    color: colors.textSecondary,
    marginBottom: 10,
  },
});

export default ProfileScreen;
