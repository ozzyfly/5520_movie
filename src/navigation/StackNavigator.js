import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import EditProfileScreen from "../screens/EditProfileScreen"; // Import your EditProfileScreen
import ReviewScreen from "../screens/ReviewScreen"; // Import the ReviewScreen
import { Ionicons } from "@expo/vector-icons";
import ReviewListScreen from "../screens//ReviewListScreen";
import AddReviewScreen from "../screens//AddReviewScreen";

const Stack = createStackNavigator();

const StackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ title: "Movie Details" }}
      />
      {/* Add the EditProfileScreen to the stack navigator */}
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
        name="ReviewListScreen"
        component={ReviewListScreen}
        options={{ title: "Movie Reviews" }}
      />
      <Stack.Screen
        name="AddReviewScreen"
        component={AddReviewScreen}
        options={{ title: "Add a Review" }}
      />
      {/* ... other screens */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
