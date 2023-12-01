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
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("MainStackHome");
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={{ paddingRight: 20 }}
          >
            <Ionicons name="person-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        ),
        headerRightContainerStyle: {
          padding: 10,
        },
      }}
    >
      <Stack.Screen
        name="MainStackHome"
        component={MainScreen}
        options={{
          title: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="exit-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{
          title: "Movie Details",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{
          title: "Movie Reviews",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddReviewScreen"
        component={AddReviewScreen}
        options={{
          title: "Add a Review",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditReviewScreen"
        component={EditReviewScreen}
        options={{
          title: "Edit Review",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ReviewList"
        component={ReviewListScreen}
        options={{
          title: "Review List",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Cinemas"
        component={NearbyCinemasScreen}
        options={{
          title: "Nearby Cinemas",
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ paddingLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      {/* ... other screens */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
