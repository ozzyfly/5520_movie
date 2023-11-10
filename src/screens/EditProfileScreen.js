// EditProfileScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { updateUserDocument } from "../firebase/database"; // Corrected import statement

const EditProfileScreen = ({ route, navigation }) => {
  console.log("Received userData:", route.params?.userData);

  const userData = route.params?.userData;
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");

  const handleSaveProfile = async () => {
    if (!userData?.id) {
      Alert.alert("Error", "No userId provided");
      return;
    }
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Name and email cannot be empty.");
      return;
    }

    try {
      await updateUserDocument(userData.id, { name, email }); // Using the correct function
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error updating profile",
        error.message || "An unknown error occurred"
      );
    }
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <Button title="Save Profile" onPress={handleSaveProfile} />
    </View>
  );
};

export default EditProfileScreen;
