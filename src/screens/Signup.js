import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.navigate("Login");
  };

  const signupHandler = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Fields should not be empty");
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert("Password and confirm password should be equal");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Store the user data in Firestore upon successful signup
      const userRef = doc(db, "users", userCred.user.uid);
      await setDoc(userRef, {
        email: email,
        createdAt: new Date(),
        // You can add more user-related data here if needed
      });
      // Navigate to the app's main screen or perform other actions
    } catch (err) {
      console.error("Sign up error", err.code);
      // Handle different error codes and show appropriate feedback to the user
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});
