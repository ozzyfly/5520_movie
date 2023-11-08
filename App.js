import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });

    return unsubscribe; // Clean up the listener on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUserLoggedIn ? (
          // User is logged in, show the main app
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          // No user is logged in, show the auth screens
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
