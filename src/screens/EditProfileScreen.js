// EditProfileScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { updateUserData } from "../firebase/database";

const EditProfileScreen = ({ route, navigation }) => {
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
      await updateUserData(userData.id, { name, email });
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error updating profile", error.message);
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
