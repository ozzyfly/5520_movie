// BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./StackNavigator"; // This will include the 'Main' screen and others you have defined.
import { Ionicons } from "@expo/vector-icons";
import NearbyCinemasScreen from "../screens/NearbyCinemasScreen";
import ReviewScreen from "../screens/ReviewScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            // Ensure you have a 'Profile' screen if you're using this icon.
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Cinemas") {
            iconName = focused ? "film" : "film-outline";
          } else if (route.name === "Reviews") {
            // Add icon for Reviews tab.
            iconName = focused ? "star" : "star-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
          backgroundColor: "#fff",
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Reviews"
        component={ReviewScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cinemas"
        component={NearbyCinemasScreen}
        options={{ headerShown: false }}
      />
      {/* Add more tabs as needed */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
