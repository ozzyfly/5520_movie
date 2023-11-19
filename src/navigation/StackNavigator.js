import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "../firebase/auth";
import MainScreen from "../screens/MainScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ReviewScreen from "../screens/ReviewScreen";
import AddReviewScreen from "../screens/AddReviewScreen";
import EditReviewScreen from "../screens/EditReviewScreen";
import ReviewListScreen from "../screens/ReviewListScreen";
import NearbyCinemasScreen from "../screens/NearbyCinemasScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const StackNavigator = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Logout Error", "Unable to logout. Please try again.");
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="MainStackHome"
        component={MainScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ title: "Movie Details" }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{ title: "Movie Reviews" }}
      />
      <Stack.Screen
        name="AddReviewScreen"
        component={AddReviewScreen}
        options={{ title: "Add a Review" }}
      />
      <Stack.Screen
        name="EditReviewScreen"
        component={EditReviewScreen}
        options={{ title: "Edit Review" }}
      />
      <Stack.Screen
        name="ReviewList"
        component={ReviewListScreen}
        options={{ title: "Review List" }}
      />
      <Stack.Screen
        name="Cinemas"
        component={NearbyCinemasScreen}
        options={{ title: "Nearby Cinemas" }}
      />
      {/* ... other screens */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
